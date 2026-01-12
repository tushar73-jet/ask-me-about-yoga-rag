const mongoose = require("mongoose")

const QueryLogSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    sources: {
      type: [String],
      default: [],
    },
    isUnsafe: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("QueryLog", QueryLogSchema)
