const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Ajusta el modo según tu necesidad; normalmente se inyecta con cross-env en los scripts
  mode: process.env.NODE_ENV === "development" ? "development" : "production",

  entry: "./src/renderer/index.tsx",

  output: {
    path: path.join(__dirname, "dist", "renderer"),
    filename: "renderer.js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  performance: {
    hints: "warning", // 'error' para tratarlo como fallo, o false para desactivar
    maxAssetSize: 500 * 1024, // bytes; aquí 500 KiB
    maxEntrypointSize: 500 * 1024, // idem
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          // Usa el tsconfig principal (tsconfig.json) para el Renderer
          configFile: "tsconfig.json",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Aquí puedes añadir loaders para imágenes, fuentes, etc.
    ],
  },

  devServer: {
    static: path.join(__dirname, "dist", "renderer"),
    port: 3000,
    hot: true,
    historyApiFallback: true, // si usas React Router
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html", // tu plantilla base
      filename: "index.html",
    }),
  ],
};
