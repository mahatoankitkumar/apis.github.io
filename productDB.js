require("dotenv").config();
const connectDB = require("./db/connect");
const product = require("./models/product");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
