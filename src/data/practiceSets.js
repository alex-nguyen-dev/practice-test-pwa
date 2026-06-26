const modules = import.meta.glob('./sets/*.json', { eager: true });

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const practiceSets = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));

export const collections = Object.values(
  practiceSets.reduce((acc, set) => {
    const slug = slugify(set.collection);
    if (!acc[slug]) {
      acc[slug] = {
        id: slug,
        title: set.collection,
        sets: [],
      };
    }
    acc[slug].sets.push(set);
    return acc;
  }, {}),
).sort((a, b) => a.title.localeCompare(b.title));

export const getCollection = (slug) => collections.find((collection) => collection.id === slug);

export const getSet = (setId) => practiceSets.find((set) => set.id === setId);

export const getQuestionKind = (question) => {
  const correctCount = question.choices.filter((choice) => choice.correct).length;
  return {
    correctCount,
    isMultiAnswer: correctCount > 1,
  };
};
