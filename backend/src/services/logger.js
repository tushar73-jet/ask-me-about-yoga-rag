const QueryLog = require("../models/QueryLog")

const logQuery = async ({ question, answer, sources, isUnsafe }) => {
  try {
    await QueryLog.create({
      question,
      answer,
      sources,
      isUnsafe,
    });
  } catch (err) {
    console.error("Failed to log query:", err.message)
  }
}

module.exports = { logQuery }
