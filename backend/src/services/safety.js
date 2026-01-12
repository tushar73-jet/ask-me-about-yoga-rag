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
    return ("⚠️ Your question involves a yoga practice that may not be safe without personalized guidance.\n\n" +
    "Certain poses and techniques can be risky during conditions such as pregnancy, recent surgery, or medical concerns.\n\n" +
    "Instead of advanced or inverted poses, consider gentle breathing exercises, restorative poses, or relaxation practices.\n\n" +
    "Please consult a doctor or a certified yoga therapist before attempting these practices.")
}


module.exports = {
    isUnsafe,
    safetyMessage
}