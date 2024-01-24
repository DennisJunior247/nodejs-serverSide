const http = require("http");

const doOnincoming = (req, res) => {
  res.end("welcome to twitter");
};

const doOnError = (req, res) => {
  res.error("error");
};

const server = http.createServer();
server.listen(80);

server.on("clientError", doOnError);
server.on("request", doOnincoming);
