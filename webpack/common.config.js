const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const WebpackBar = require('webpackbar');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
  target: 'web',
  context: path.join(__dirname, '../'),
  entry: {
    project: path.resolve(__dirname, '../static/js/project'),
    vendors: path.resolve(__dirname, '../static/js/vendors'),
  },
  output: {
    path: path.resolve(__dirname, "../assets/webpack_bundles/"),
    publicPath: "/static/webpack_bundles/",
    filename: "js/[name]-[fullhash].js",
    chunkFilename: "js/[name]-[fullhash].js",
    clean: true,
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, '../assets')),
      filename: 'webpack-stats.json',
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static/images/favicons"),
          to: "images",
        },
        {
          from: path.resolve(__dirname, "../static/images/sections"),
          to: "images",
        },
        {
          from: path.resolve(__dirname, "../static/videos"),
          to: "videos",
        },
        {
          from: path.resolve(__dirname, "../static/images/icons"),
          to: "images",
        },
        {
          from: path.resolve(__dirname, "../static/images/avatar"),
          to: "images",
        },
      ]
    }),
    new WebpackBar({
      name: 'Compilation',
      color: 'green',
    }),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["imagemin-mozjpeg", { quality: 70 }],
            ["imagemin-pngquant", { quality: [0.6, 0.8] }],
            ["imagemin-gifsicle", { interlaced: true }],
            [
              "imagemin-svgo",
              {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            ],
          ],
        },
      },
    }),

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|webp|svg)$/i,
        type: "asset",
        generator: {
          filename: "images/[name].[hash][ext]",
          publicPath: "/static/webpack_bundles/",
        },
        exclude: /data:image/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              url: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@images": path.resolve(__dirname, "../static/images"),
      "@fonts": path.resolve(__dirname, "../static/fonts"),
      "@/src": path.resolve(__dirname, "../static/src")
    },
  },
};
