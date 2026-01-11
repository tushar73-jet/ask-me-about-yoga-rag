const crypto = require("crypto");

const embedText = async (text) => {
  const hash = crypto.createHash("sha256").update(text).digest();
  return Array.from(hash).map(b => b / 255);
};

module.exports = { embedText };


