const fs = require("fs");

let = "";

const cleanTweetFilter = () => {};

const doOnIncoming = (data) => {
  cleanTweet = cleanTweetFilter(data);
};

const Streamed = fs.createReadStream("./tweet.json");

Streamed.on("data", doOnIncoming);
