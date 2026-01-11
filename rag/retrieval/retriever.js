const {chunkDocs} =  require("../chunking/chunker")
const {embedText} = require("../embeddings/embedder")

const {storeEmbedding,findRelevantData} = require("../vectorstore/store")

let initialized = false


// load docs

const initializeVectorStore = async () => {
  if (initialized) return;

  const chunks = chunkDocs();

  for (const i of chunks) {
    const vector = await embedText(i.text);
    storeEmbedding(vector, i);
  }
  initialized = true;
  console.log(`Vector store initialized with ${chunks.length} chunks`)
}

// retrieve top matches
const retrieveRelevantChunks = async (query, limit = 3) => {
  await initializeVectorStore();

  const questionVector = await embedText(query);
  return findRelevantData(questionVector, limit);
};

module.exports = {
  retrieveRelevantChunks
};