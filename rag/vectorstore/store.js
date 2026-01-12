const faiss = require('faiss-node')

let index = null
let docs = []

const DIMENSION = 384


const getIndex = () => {
  if (!index) {
    index = new faiss.IndexFlatL2(DIMENSION)
  }
  return index;
}

const addVectors = (vectors, metadata) => {
  const faissIndex = getIndex()

  faissIndex.add(vectors)
  docs.push(...metadata)
}

function searchVectors(queryVector, topK = 3) {
  const result = getIndex().search(queryVector, topK);

  return result.labels[0].map((id, i) => ({
    score: result.distances[0][i],
    content: docs[id],
  }))
}

module.exports = {
  addVectors,
  searchVectors,
}


