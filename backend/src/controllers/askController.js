const askQuestion = async(req,res) => {
  const {query} = req.body;

  if (!query) {
    return res.status(400).json({error: "query missing"});
  }

  res.json({
    answer: "....",
    sources: [],
    isUnsafe: false
  });
};

module.exports = {askQuestion};
