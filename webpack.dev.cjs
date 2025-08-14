const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  devServer: {
    static: { directory: path.join(process.cwd(), "public") },
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3000,
    hot: true,
    client: { overlay: { errors: true, warnings: false } },
  },
});
