import { chroma } from '@/src/lib/chroma';
import { generateEmbedding } from '@/src/utils/embedding';

export async function searchKnowledge(
  query: string,
  category: string | null = null,
  avoid: string[] | null = null
) {
  const collection =
    await chroma.getCollection({
      name: 'coffee-shop',
    });

  const embedding =
    await generateEmbedding(query);

  const results =
    await collection.query({
      queryEmbeddings: [embedding],

      nResults: 8,

      ...(category && {
        where: {
          category
        },
      }),
    });

  const ranked = results.documents[0]
    .map((doc, i) => ({
      doc,
      distance: results.distances[0][i],
      metadata: results.metadatas?.[0]?.[i],
    }))
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

  const normalizedAvoid = (avoid ?? []).map(a =>
    a.toLowerCase().trim()
  );

  const filteredRanked = normalizedAvoid.length
  ? ranked.filter(item => {
      const types = (item?.metadata?.types as string[] ?? []).map(t =>
        t.toLowerCase().trim()
      );

      return !normalizedAvoid.some(a =>
        types.includes(a)
      );
    })
  : ranked;

  const top = filteredRanked.slice(0, 4);

  return {
    documents: top.map((item, i) => {
      const { types, ...cleanMetadata } = item.metadata || {};
      return {
        ...cleanMetadata,
      }
    })
  };
}
