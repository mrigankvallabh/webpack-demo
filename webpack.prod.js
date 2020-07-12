const path = require("path");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // npm install if required

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // minimizer: [new OptimizeCssAssetsPlugin()], // Not required as newer Webpack minifies everything
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/template.html" }),
    new MiniCssExtractPlugin({ filename: "[name].[contenHash].css" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract Minified CSS into files
          "css-loader", //2. Turn to js
          "sass-loader", //1. Compile to CSS
        ],
      },
    ],
  },
});
