const {chunkDocs} =  require("../chunking/chunker")
const {embedText} = require("../embeddings/embedder")

const {addVectors,searchVectors} = require("../vectorstore/store")

let initialized = false


// load docs

const initializeVectorStore = async () => {
  if (initialized) return;

  const chunks = chunkDocs();
  const vectors = [];
  const metadata = []

  for (const i of chunks) {
    const vector = await embedText(i.text);
    vectors.push(vector)
    metadata.push(i)


  }

  addVectors(vectors, metadata)
  initialized = true;
  console.log(`FAISS index initialized with ${chunks.length} chunks`)
}

// retrieve top matches
const retrieveRelevantChunks = async (query, limit = 3) => {
  await initializeVectorStore();

  const questionVector = await embedText(query);
  return searchVectors(questionVector, limit);
};

module.exports = {
  retrieveRelevantChunks
};