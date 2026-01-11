const memoryStore = []


// save embedding with its related data
const storeEmbedding = (vector, content) =>{
    memoryStore.push({vector, content})
}




// measure how similar two vectors are
const similarityScore = (vectorA, vectorB) => {
    let dot = 0
    let magA = 0
    let magB = 0 



for (let i = 0; i< vectorA.length; i ++){
    dot += vectorA[i] * vectorB[i]
    magA += vectorA[i] * vectorA[i]
    magB += vectorB[i] * vectorB[i]
}

return dot / (Math.sqrt(magA)* Math.sqrt(magB))


}

// find most relevant stored data for user ques

const findRelevantData = (questionVector,limit = 3) =>{
    return memoryStore.map(i =>({
        score: similarityScore(questionVector, i.vector),
        content: i.content
    }))
    .sort((a,b)=>b.score-a.score)
    .slice(0,limit)
}

module.exports = {
    storeEmbedding,
    findRelevantData


}
