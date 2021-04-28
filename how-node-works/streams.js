const server = require("http").createServer();
const fs = require("fs");

server.on("request", (req, res) => {
  //   const readable = fs.createReadStream("test.txt");
  //   readable.on("data", (data) => res.write(data));
  //   readable.on("end", () => res.end());
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("invalid file mother fucker!");
  //   });

  //second solution//
  const readable = fs.createReadStream("test.txt");
  readable.pipe(res);
  readable.on("end", () => res.end());
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("invalid file mother fucker!");
  });
});

server.listen(4000, "localhost", () => console.log("server connected"));
