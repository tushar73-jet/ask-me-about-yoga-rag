const {isUnsafe,safetyMessage} = require("../services/safety");

const askQuestion = async(req,res) => {
  const {query} = req.body;

  if (!query) {
    return res.status(400).json({error: "query missing"});
  }

  const unsafe = isUnsafe(query)

  let answer = 'answer'

  if (unsafe){
    answer = safetyMessage()
  }

  res.json({
    answer,
    sources: [],
    unsafe
  });
};

module.exports = {askQuestion};
