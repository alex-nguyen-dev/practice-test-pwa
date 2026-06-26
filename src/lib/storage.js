const STORAGE_KEY = 'practice-glass-progress';

export const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

export const saveSetProgress = (setId, progress) => {
  const current = loadProgress();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...current,
      [setId]: {
        ...current[setId],
        ...progress,
        updatedAt: new Date().toISOString(),
      },
    }),
  );
};

export const clearSetProgress = (setId) => {
  const current = loadProgress();
  delete current[setId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
};
