import fs from 'fs';
import path from 'path';

import { chroma } from '@/src/lib/chroma';
import { generateEmbedding } from '@/src/utils/embedding';

function extractMetadata(content: string) {
  const categoryMatch =
    content.match(/Categoria:\s*(.*)/i);

  const nameMatch =
    content.match(/Nome:\s*(.*)/i);

  const typeMatch =
    content.match(/Tipo:\s*([\s\S]*?)Ingredientes:/i);

  const ingredientsMatch =
    content.match(/Ingredientes:\s*([\s\S]*?)Combina com:/i);

  const combinesWithMatch = content.match( /Combina com:\s*([\s\S]*?)Descrição:/i, );

  const descriptionMatch = content.match(/Descrição:\s*([\s\S]*?)(?=\n[A-ZÀ-Ú][a-zA-ZÀ-Ú]+\s*:|$)/i, );

  const category =
    categoryMatch?.[1]?.trim().toLowerCase() || 'geral';

  const name =
    nameMatch?.[1]?.trim().toLowerCase() || 'produto';

  const types =
    typeMatch?.[1]
      ?.split('\n')
      .map(line =>
        line.replace('-', '').trim().toLowerCase(),
      )
      .filter(Boolean) || [];

  const ingredients =
    ingredientsMatch?.[1]
      ?.split('\n')
      .map(line =>
        line.replace('-', '').trim().toLowerCase(),
      )
      .filter(Boolean) || [];

  const combinesWith = combinesWithMatch?.[1]
    ?.split('\n')
    .map(line => line
        .replace('-', '').trim().toLowerCase(),
      )
    .filter(Boolean) || [];
  
  const description = descriptionMatch?.[1]?.trim() || '';

  return {
    name,
    category,
    types,
    ingredients,
    combinesWith,
    description,
  };
}

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

  const files =
    fs.readdirSync(knowledgePath);

  for (const file of files) {
    const content = fs.readFileSync(
      path.join(knowledgePath, file),
      'utf-8',
    );

    const embedding =
      await generateEmbedding(content);

    const metadata =
      extractMetadata(content);

    await collection.upsert({
      ids: [file],
      documents: [content],
      embeddings: [embedding],
      metadatas: [metadata],
    });

    console.log(
      `Indexed ${file}`,
      metadata,
    );
  }

  console.log('Knowledge indexed!');
}

seed();
