const bs = require("browser-sync").create();
const express = require("express");
const webpack = require("webpack");
const config = require("../build/webpack.client.dev");
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

app.listen(PORT);
