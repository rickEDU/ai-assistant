import { chroma } from "../lib/chroma";

export async function deleteKnowledge() {
  await chroma.deleteCollection({ name: 'coffee-shop', });
}

deleteKnowledge();