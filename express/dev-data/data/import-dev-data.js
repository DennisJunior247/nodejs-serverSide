const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("../../models/tourModel");
dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE_LOCAL || 8800;

//connecting to mongoose erver locally
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`database connected at port ${db}`))
  .catch((err) => console.error(err));

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

const importDevData = async () => {
  try {
    await Tour.create(data);
    console.log("added");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
const DeleteDevData = async () => {
  try {
    await Tour.deleteMany();
    console.log("deleted");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
if (process.argv[2] === "--import") {
  importDevData();
} else if (process.argv[2] === "--delete") {
  DeleteDevData();
}
// console.log(process.argv);
