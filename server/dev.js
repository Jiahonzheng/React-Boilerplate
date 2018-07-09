const bs = require("browser-sync").create();
const config = require("../build/webpack.client.dev");
const express = require("express");
const path = require("path");
const webpack = require("webpack");
const {PORT} = require("../config");

const app = express();
const worker = webpack(config);

app.use(
  require("webpack-dev-middleware")(worker, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true,
    stats: {
      colors: true
    }
  })
);
app.use(require("webpack-hot-middleware")(worker));

bs.init({
  open: true,
  ui: false,
  notify: false,
  proxy: "localhost:8887",
  port: 8080
});

app.get("*", function(req, res) {
  const filename = path.join(worker.outputPath, "index.html");

  worker.outputFileSystem.readFile(filename, function(err, file) {
    if (err) {
      return res.end("404");
    }

    res.set("content-type", "text/html");
    res.send(file);
    res.end();
  });
});

app.listen(PORT);
