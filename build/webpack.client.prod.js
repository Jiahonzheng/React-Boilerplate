const path = require("path");
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyPlugin = require("uglifyjs-webpack-plugin");

const config = {
  mode: "production",
  entry: path.join(__dirname, "../app/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist/client/")
  },
  node: {
    __dirname: true
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["react", "stage-2"]
        },
        exclude: [path.join(__dirname, "../node_modules/")]
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_DEV: "production"
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyPlugin({
        uglifyOptions: {
          ecma: 8,
          compress: {
            inline: 1
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

module.exports = config;
