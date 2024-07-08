const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  entry: { index: "./src/index.js", sw: "./src/sw.js" },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("https://spielbetrieb.eu"),
      "process.env.HOST_URL": JSON.stringify("https://spielbetrieb.eu"),
      "process.env.PROD": true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.webmanifest" },
        { from: "public/icon.png" },
        {
          from: "public/locales/en/translation.json",
          to: "locales/en/translation.json",
        },
        {
          from: "public/locales/de/translation.json",
          to: "locales/de/translation.json",
        },
        { from: "public/spielbetrieb_logo_beige_24.png" },
        { from: "public/spielbetrieb_logo_beige_128.png" },
        { from: "public/spielbetrieb_logo_beige_256.png" },
        { from: "public/spielbetrieb_logo_beige_512.png" },
      ],
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(pdf)$/,
        use: ["file-loader"],
      },
    ],
  },
};
