const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodeExternalsPlugin = require("webpack-node-externals");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyPlugin = require("uglifyjs-webpack-plugin");

const config = {
  mode: "production",
  entry: path.join(__dirname, "../cli/prod.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist/ssr/")
  },
  node: {
    __dirname: true
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            "react",
            "stage-2",
            [
              "env",
              {
                targets: {
                  node: "current"
                }
              }
            ]
          ]
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devtool: "none",
  externals: [NodeExternalsPlugin()],
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
