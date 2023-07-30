require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 8888;
const routes = require("./routes/product");
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT,() => 
    console.log(`${PORT} is up`));
  } catch (error) {
    console.log(error);
  }
}

start();


/*
  TODO:
  -> add to github
  -> add auth for all the apis
  -> on log out remove the token from db
  -> do something about the token being full
  -> login with social networking site (a frontEnd task)

  -> jenkins pipeline
  -> docker setup
  -> sandbox deployment
*/