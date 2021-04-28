const EventsEmitter = require("events");
const http = require("http");
const myEvents = new EventsEmitter();

myEvents.on("newSales", () => console.log("omo i done de learn node oo"));
myEvents.emit("newSales");

const server = http.createServer();

server.on("request", (req, res) => res.end("sent"));

server.listen(2000, "localhost", () => console.log("ok"));
