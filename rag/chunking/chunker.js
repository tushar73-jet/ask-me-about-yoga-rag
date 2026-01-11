const fs = require("fs")
const path = require("path")

const chunkSize = 120

const chunkText = (text) => {
    const words = text.split(/\s+/)
    const chunks = []


for (let i = 0; i<words.length;i+=chunkSize){
    chunks.push(words.slice(i,i+chunkSize).join(" "))

}

return chunks
}

const chunkDocs = () => {
  const dataDir = path.join(__dirname, "../data/yoga_articles");

  return fs.readdirSync(dataDir).flatMap((file) => {
    const content = fs.readFileSync(path.join(dataDir, file),"utf-8");

    return chunkText(content).map((chunk, index) => ({
      id: `${file}-chunk-${index}`,
      text: chunk,
      source: file
    }))
  })
}

module.exports = {chunkDocs};

