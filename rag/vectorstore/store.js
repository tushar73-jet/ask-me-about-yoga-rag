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
 

  const flat = []

  vectors.forEach((vec, i) => {
    if (!Array.isArray(vec) || vec.length !== DIMENSION) {
      throw new Error(`Invalid embedding at index ${i}`);
    }
    flat.push(...vec);
  })
  faissIndex.add(flat)
  docs.push(...metadata)
}

function searchVectors(queryVector, topK = 3) {
  if (!Array.isArray(queryVector) || queryVector.length !== DIMENSION) {
    throw new Error("Invalid query embedding");
  }
  const result = getIndex().search(queryVector, topK)

  const labels = Array.from(result.labels);
  const distances = Array.from(result.distances);

  return labels.map((id, i) => ({
    score: distances[i],
    content: docs[id],
  }))
}

module.exports = {
  addVectors,
  searchVectors,
}


