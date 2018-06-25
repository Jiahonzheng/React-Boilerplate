const http = require("http");
const static = require("./static");

const PORT = 8887;

function server(req, res) {
  static(req, res);
}

http.createServer(server).listen(PORT);
