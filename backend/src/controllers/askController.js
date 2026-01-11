const {isUnsafe,safetyMessage} = require("../services/safety");
const { retrieveRelevantChunks } = require("../../../rag/retrieval/retriever");
const { generateAnswer } = require("../services/llm");



const askQuestion = async(req,res) => {
try{
  const {question} = req.body;

  if (!question) {
    return res.status(400).json({error: "question missing"});
  }

  //safety check
  const unsafe = isUnsafe(question)


  //rag retrieval
  const chunks = await retrieveRelevantChunks(question)


  //build context
  const context = chunks.map(i => i.content.text).join("\n\n")

  //generate ans
  let answer = await generateAnswer({
    question,
    context,
    unsafe
  })




  if (unsafe){
    answer = safetyMessage()
  }

  res.json({
    answer,
    sources: chunks.map(i => i.content.source),
    isUnsafe: unsafe

  });
    } catch(err)
    {console.error(err)
    res.status(500).json({ error: "Internal server error" })}
};

module.exports = {askQuestion};
