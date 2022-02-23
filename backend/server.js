const app = require("./app");
const connectDataBase = require("./config/database");
const cloudinary = require("cloudinary");

// handled uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("sutting down the server because of Uncaught Exception");
  process.exit(1);
});

// config
require("dotenv").config({ path: "backend/config/config.env" });

// connection Database
connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// server start here
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promice rejection
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("sutting down the server because of unhandled promice rejection");
  server.close(() => {
    process.exit(1);
  });
});
