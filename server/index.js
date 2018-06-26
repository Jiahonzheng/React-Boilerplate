const express = require("express");
const path = require("path");

import SSR from "./ssr";

const PORT = 8887;

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist/client/")));

app.get("/*", function(req, res) {
  SSR(req, res);
});

app.listen(PORT);
