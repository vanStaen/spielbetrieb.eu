import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
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
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.webmanifest" },
        { from: "public/icon.png" },
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
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};

export default config;
