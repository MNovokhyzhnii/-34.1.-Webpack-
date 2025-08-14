const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: path.resolve(process.cwd(), "src", "index.js"), // 👉 якщо TS — постав 'index.ts'
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "assets/js/[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/media/[hash][ext][query]",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: { "@": path.resolve(process.cwd(), "src") },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
      },
      { test: /\.(woff2?|eot|ttf|otf)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "public", "index.html"),
      favicon: false,
    }),
    new ESLintPlugin({ extensions: ["ts", "tsx", "js", "jsx"] }),
    new ForkTsCheckerWebpackPlugin(), // без TS теж ок — просто не запускає typecheck
  ],
};
