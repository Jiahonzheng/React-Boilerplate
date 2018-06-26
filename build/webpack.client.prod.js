const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");

const config = {
  mode: "production",
  entry: path.join(__dirname, "../app/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist/client/")
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
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new uglify({
        uglifyOptions: {
          ecma: 8,
          compress: {
            inline: 1
          }
        }
      })
    ]
  }
};

module.exports = config;
