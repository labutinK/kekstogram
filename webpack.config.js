const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: './js/main.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/vendors.css",
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000, // Порт для Browser Sync
      server: {baseDir: ['build']},
      open: false // Отключает автоматическое открытие браузера
    })
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  }
};
