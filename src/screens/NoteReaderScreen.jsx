import { useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TableOfContents, X } from 'lucide-react';
import { useState } from 'react';
import { GlassButton } from '../components/GlassButton.jsx';
import { getNote } from '../data/notesList.js';

const textFromChildren = (children) => {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join('');
  if (children?.props?.children) return textFromChildren(children.props.children);
  return '';
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const uniqueSlug = (text, counts) => {
  const base = slugify(text) || 'section';
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
};

const getHeadings = (content) => {
  const counts = new Map();
  let inFence = false;

  return content
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return null;
      }
      if (inFence) return null;

      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (!match) return null;

      const text = match[2].trim();
      return {
        id: uniqueSlug(text, counts),
        level: match[1].length,
        text,
      };
    })
    .filter(Boolean);
};

const createHeadingIdQueues = (headings) =>
  headings.reduce((queues, heading) => {
    const key = heading.text;
    queues.set(key, [...(queues.get(key) ?? []), heading.id]);
    return queues;
  }, new Map());

function ContentsSheet({ open, headings, onClose, onSelect }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 backdrop-blur-sm dark:bg-slate-950/70 sm:items-center sm:p-3">
      <section className="flex h-[100dvh] w-full max-w-2xl flex-col overflow-hidden border border-white/35 bg-white/80 shadow-glass backdrop-blur-2xl dark:border-white/15 dark:bg-slate-900/90 sm:h-auto sm:max-h-[86vh] sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/30 p-3.5 pt-[max(env(safe-area-inset-top),0.875rem)] dark:border-white/10 sm:p-4 sm:pt-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 sm:text-sm">Study note</p>
            <h2 className="text-base font-bold text-slate-950 dark:text-white sm:text-lg">On this page</h2>
          </div>
          <GlassButton icon={X} label="Close contents" onClick={onClose} />
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto px-3.5 py-2 pb-[max(env(safe-area-inset-bottom),0.875rem)] sm:max-h-[68vh] sm:flex-none sm:px-4 sm:pb-4">
          <div className="divide-y divide-slate-200/70 dark:divide-white/10">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(event) => onSelect(event, heading.id)}
                className={`block py-2.5 text-sm font-semibold leading-snug text-slate-700 transition hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300 ${
                  heading.level === 3 ? 'pl-5 text-[13px] font-medium text-slate-600 dark:text-slate-300' : ''
                }`}
              >
                {heading.text}
              </a>
            ))}
          </div>
        </nav>
      </section>
    </div>,
    document.body,
  );
}

export default function NoteReaderScreen() {
  const { noteId } = useParams();
  const note = getNote(noteId);
  const [contentsOpen, setContentsOpen] = useState(false);

  if (!note) {
    return <p className="px-1 text-slate-500 dark:text-slate-400">Note not found.</p>;
  }

  const headings = getHeadings(note.content);
  const renderedHeadingIds = createHeadingIdQueues(headings);

  const nextRenderedHeadingId = (children) => {
    const text = textFromChildren(children).trim();
    const queuedIds = renderedHeadingIds.get(text);
    const queuedId = queuedIds?.shift();
    if (queuedIds?.length === 0) renderedHeadingIds.delete(text);
    return (queuedId ?? slugify(text)) || 'section';
  };

  const jumpToHeading = (event, id) => {
    event.preventDefault();
    setContentsOpen(false);
    window.history.replaceState(null, '', `#${id}`);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });
  };

  return (
    <section className="space-y-5">
      {headings.length > 0 && (
        <GlassButton
          icon={TableOfContents}
          label="Open contents"
          onClick={() => setContentsOpen(true)}
          className="z-[45] h-12 min-h-12 w-12 rounded-2xl shadow-glass sm:bottom-6 sm:right-[max(1.5rem,calc((100vw-48rem)/2+1.5rem))]"
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: 'calc(max(env(safe-area-inset-bottom), 0px) + 4.75rem)',
          }}
        />
      )}

      <article className="prose prose-slate max-w-none scroll-smooth dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-sky-600 sm:prose-h1:text-3xl sm:prose-h2:text-2xl sm:prose-h3:text-xl dark:prose-a:text-sky-400">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => {
              const id = nextRenderedHeadingId(children);
              return <h2 id={id}>{children}</h2>;
            },
            h3: ({ children }) => {
              const id = nextRenderedHeadingId(children);
              return <h3 id={id}>{children}</h3>;
            },
          }}
        >
          {note.content}
        </Markdown>
      </article>

      <ContentsSheet
        open={contentsOpen}
        headings={headings}
        onClose={() => setContentsOpen(false)}
        onSelect={jumpToHeading}
      />
    </section>
  );
}
