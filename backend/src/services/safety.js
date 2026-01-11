const unsafeWords = [
  "pregnant",
  "pregnancy",
  "trimester",
  "hernia",
  "glaucoma",
  "blood pressure",
  "bp",
  "hypertension",
  "heart problem",
  "heart disease",
  "surgery",
  "recent surgery",
  "slip disc",
  "spine injury"
];

const isUnsafe = (query = "") =>{
    const lower = query.toLowerCase()

    return unsafeWords.some(i=>lower.includes(i))
}

const safetyMessage = () => {
    return ('warning message')
}


module.exports = {
    isUnsafe,
    safetyMessage
}