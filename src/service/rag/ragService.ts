import { chroma } from '@/src/lib/chroma';
import { generateEmbedding } from '@/src/lib/embedding';

export async function searchKnowledge(
  query: string,
) {
  const collection =
    await chroma.getCollection({
      name: 'coffee-shop',
    });

  const embedding =
    await generateEmbedding(query);

  const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 3,
  });

  return results.documents[0];
}
