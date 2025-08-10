const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const isProd = process.env.NODE_ENV === "production";

/**
 * Optimization strategy:
 * - contenthash in output filenames (cache-busting)
 * - code splitting via splitChunks + separate runtime chunk
 * - treat lodash as external and load from CDN in index.html via HtmlWebpackTagsPlugin (smaller bundle)
 */
module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].[contenthash:8].js",
    assetModuleFilename: "assets/media/[name].[contenthash][ext][query]",
    publicPath: "",
    // works for GitHub Pages with repo subpath when using relative asset paths in HTML plugin
  },
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 5173,
    open: false,
    hot: true,
    compress: true,
  },
  module: {
    rules: [
      // CSS (from SCSS can be added later if needed)
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      // Images (png, jpg, jpeg, gif, svg, webp)
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 }, // <=10kb inlined, otherwise emitted
        },
        generator: {
          filename: "assets/images/[name].[contenthash][ext]",
        },
      },
      // Fonts (woff, woff2, ttf, otf, eot)
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]",
        },
      },
    ],
  },
  externals: {
    // Optimize bundle size: use lodash from CDN (available as global _)
    lodash: "_",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      minify: isProd
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          }
        : false,
    }),
    // Inject lodash CDN after HtmlWebpackPlugin emits HTML
    new HtmlWebpackTagsPlugin({
      tags: [
        // lodash from jsDelivr (production-ready CDN)
        "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
      ],
      append: false,
      publicPath: false,
    }),
  ],
};
