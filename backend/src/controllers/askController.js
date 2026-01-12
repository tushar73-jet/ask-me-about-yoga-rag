const {isUnsafe,safetyMessage} = require("../services/safety");
const { retrieveRelevantChunks } = require("../../../rag/retrieval/retriever");
const { generateAnswer } = require("../services/llm");
const { logQuery } = require("../services/logger");

const askQuestion = async(req,res) => {
try{
  const {question} = req.body;

  if (!question) {
    return res.status(400).json({error: "question missing"});
  }

  const unsafe = isUnsafe(question)

  //safety check

  if (unsafe){
    const answer = safetyMessage()
  

  await logQuery({
  question,
  answer,
  sources: [],
  isUnsafe: true
})


  return res.json({
    answer,
    sources:[],
    isUnsafe: true
  })
}
  //rag retrieval
  const chunks = await retrieveRelevantChunks(question)


  //build context
  const context = chunks.map(i => i.content.text).join("\n\n")

  //generate ans
  const answer = await generateAnswer({
    question,
    context,
    unsafe:false
  })

  await logQuery({
      question,
      answer,
      sources: chunks.map(i => i.content.source),
      isUnsafe: false,
    });

    res.json({
      answer,
      sources: chunks.map(i => i.content.source),
      isUnsafe: false,
    });

    } catch(err)
    {console.error(err)
    res.status(500).json({ error: "Internal server error" })}
};

module.exports = {askQuestion};
