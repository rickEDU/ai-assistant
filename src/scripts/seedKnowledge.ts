import fs from 'fs';
import path from 'path';

import { chroma } from '@/src/lib/chroma';
import { generateEmbedding } from '@/src/lib/embedding';

async function seed() {
  const collection =
    await chroma.getOrCreateCollection({
      name: 'coffee-shop',
      embeddingFunction: undefined,
    });

  const knowledgePath = path.join(
    process.cwd(),
    'knowledge',
  );

  const files = fs.readdirSync(
    knowledgePath
  );

  for (const file of files) {
    const content = fs.readFileSync(
      path.join(knowledgePath, file),
      'utf-8',
    );

    const embedding =
      await generateEmbedding(content);

    await collection.add({
      ids: [file],
      documents: [content],
      embeddings: [embedding],
    });

    console.log(`Indexed ${file}`);
  }
  console.log('Knowledge indexed!');
}

seed();