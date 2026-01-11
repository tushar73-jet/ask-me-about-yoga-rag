const express = require("express");
const cors = require("cors");


const askRoutes = require("./routes/askRoute");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/ask", askRoutes);

app.get("/",(req,res) => {
  res.json({status: "server is running"});
});

module.exports = app;
