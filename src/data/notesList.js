const modules = import.meta.glob('./notes/*.md', { query: '?raw', import: 'default', eager: true });

export const notes = Object.entries(modules).map(([path, content]) => {
  const id = path.replace('./notes/', '').replace('.md', '');
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : id;
  return { id, title, content };
});

export const getNote = (id) => notes.find((n) => n.id === id);
