const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generateAnswer = async ({ question, context, unsafe }) => {
  if (unsafe) {
    return "This question involves health considerations. Please consult a professional before practicing.";
  }

  const res = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a yoga assistant. Answer only using the given context." },
      { role: "user", content: `Context:\n${context}\n\nQuestion:\n${question}` }
    ],
    temperature: 0.3
  });

  return res.choices[0].message.content;
};

module.exports = { generateAnswer };
