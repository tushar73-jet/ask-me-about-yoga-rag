const {GoogleGenerativeAI} = require("@google/generative-ai")

let genAI

const getClient = () => {
    if(!genAI){
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    }
    return genAI
}


const embedText = async(text) =>{
    const client = getClient()
    const model = client.getGenerativeModel({
        model:'text-embedding-004'
    })
    const result = await model.embedContent(text)
    return result.embedding.values
}

module.exports = {embedText}

