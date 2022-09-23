const path = require("path");
const fs = require("fs");
const version = require("./package.json").version;
const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "src/styles/ant-vars.less"), "utf8")
);

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
const rules = [
  // {
  //   test: /\.(ts|tsx|js|jsx)$/,
  //   exclude: /node_modules/,
  //   use: ["babel-loader"],
  // },
  // {
  //   test: /\.css$/,
  //   use: ["style-loader", "css-loader"],
  // },
  // {
  //   test: /\.scss$/,
  //   use: [
  //     "style-loader",
  //     {
  //       loader: "css-loader",
  //       options: {
  //         sourceMap: true,
  //       },
  //     },
  //     "resolve-url-loader",
  //     {
  //       loader: "sass-loader",
  //       options: {
  //         sourceMap: true,
  //         //          includePaths: [`${__dirname}/src/aics-image-viewer/assets/styles`]
  //       },
  //     },
  //   ],
  // },
  {
    test: /\.less$/,
    //include: [path.resolve(__dirname, "node_modules")],
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: themeVariables,
            math: "always",
          },
        },
      },
    ],
  },
];

module.exports = {
  module: { rules: rules },
};
