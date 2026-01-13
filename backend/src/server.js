const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/connect")

const app = require("./app");

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  app.listen(PORT,() => {
    console.log('server is running');
  });
})