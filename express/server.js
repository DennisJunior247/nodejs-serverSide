const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE_LOCAL || 8800;

//connecting to mongoose erver locally
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`database connected at port ${db}`))
  .catch((err) => console.error(err));

// connecting to express server//

const port = process.env.PORT || 3000;
const host = "localhost";

app.listen(port, host, () => {
  console.log(`App running on port ${port}...`);
});
