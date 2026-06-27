import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNote } from '../data/notesList.js';

export default function NoteReaderScreen() {
  const { noteId } = useParams();
  const note = getNote(noteId);

  if (!note) {
    return <p className="px-1 text-slate-500 dark:text-slate-400">Note not found.</p>;
  }

  return (
    <article className="prose prose-slate mt-5 max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-sky-600 sm:mt-4 dark:prose-a:text-sky-400">
      <Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
    </article>
  );
}
