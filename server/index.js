const express = require("express");
const path = require("path");
const webpack = require("webpack");

import SSR from "./ssr";

const PORT = 8887;

const app = express();

function dev(app) {
  const bs = require("browser-sync").create();
  const CLIENT_DEV_CONFIG = require("../build/webpack.client.dev");
  const worker = webpack(CLIENT_DEV_CONFIG);

  app.use(
    require("webpack-dev-middleware")(worker, {
      publicPath: CLIENT_DEV_CONFIG.output.publicPath,
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
}

function prod(app) {
  app.use(express.static(path.resolve(__dirname, "../dist/client/")));

  app.get("/*", function(req, res) {
    SSR(req, res);
  });
}

dev(app);

app.listen(PORT);
