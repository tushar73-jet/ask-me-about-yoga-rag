const {pipeline} = require("@xenova/transformers")

let embedder = null

const loadModel = async() =>{
    if(!embedder){
        embedder = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"

        )
    }
    return embedder
}


const embedText = async (text) => {
    const model = await loadModel()


    const output = await model(text,{
        pooling:'mean',
        normalize:true
    })
  return Array.from(output.data)
};

module.exports = { embedText };


