import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const setsDir = join(process.cwd(), 'src/data/sets');
const outputPath = join(process.cwd(), 'src/data/setsIndex.json');

const sets = readdirSync(setsDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const set = JSON.parse(readFileSync(join(setsDir, file), 'utf8'));
    return {
      id: set.id,
      collection: set.collection,
      title: set.title,
      questionCount: set.questions.length,
      file: basename(file),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));

writeFileSync(outputPath, `${JSON.stringify(sets, null, 2)}\n`);
