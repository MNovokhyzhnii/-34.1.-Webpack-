const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isAnalyze = process.env.ANALYZE === "true";

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash].css",
    }),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: { chunks: "all" },
    runtimeChunk: "single",
  },
});
