const fs = require("fs");

function cleanTweet() {}

function useImportedFlie(error, data) {
  const cleanTweet = cleanTweet(data);
  const data = JSON.parse(cleanTweet);

  console.log(data);
}

fs.readFile("/tweet.json", useImportedFlie);
