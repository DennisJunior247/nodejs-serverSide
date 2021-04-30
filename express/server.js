const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

//catching synchronous error //
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE_LOCAL || 8800;

//connecting to mongoose erver locally
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`database connected at port ${db}`))
  .catch((err) => console.error(err));

// connecting to express server//

const port = process.env.PORT || 3000;
const host = "localhost";

const server = app.listen(port, host, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION");
  server.close(() => {
    process.exit(1);
  });
});
