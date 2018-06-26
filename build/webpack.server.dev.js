const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const config = {
  mode: "development",
  entry: path.join(__dirname, "../app/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist/server/")
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["react", "stage-2", "env"]
        },
        exclude: [path.join(__dirname, "../node_modules/")]
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devtool: "source-map",
  externals: [nodeExternals()]
};

module.exports = config;
