const http = require("http");

const PORT = 3000;

function setHeader(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Content-Type", "application/json");
}

function server(req, res) {
  const {url, method} = req;

  setHeader(res);

  switch (url) {
    case "/test":
      res.end(JSON.stringify({message: "Hello React-Boilerplate"}));
    default:
      res.end(JSON.stringify({message: "Wrong URL"}));
  }
}

http.createServer(server).listen(PORT);
