var path = require("path");
var fs = require("fs");
const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "lib/styles/ant-vars.less"), "utf8")
);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [
  {
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"],
  },
  // this rule processes any CSS written for this project and contained in src/
  // it applies PostCSS plugins and converts it to CSS Modules
  {
    test: /\.css/,
    include: [path.resolve(__dirname, "lib")],
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
        options: {
          modules: {
            //localIdentName: "[name]__[local]--[hash:base64:5]",
            exportLocalsConvention: "camelCase",
          },
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            ident: "postcss",
            plugins: [require("autoprefixer")],
          },
          sourceMap: true,
        },
      },
    ],
  },

  // this rule will handle any css imports out of node_modules; it does not apply PostCSS,
  // nor does it convert the imported css to CSS Modules
  // e.g., importing antd component css
  {
    test: /\.css/,
    include: [path.resolve(__dirname, "node_modules")],
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
      },
    ],
  },
  {
    // treat less files from node_modules without any css module mangling
    // i.e. no options in css-loader because we figure they are already
    test: /\.less$/,
    include: [path.resolve(__dirname, "node_modules")],
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
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
  module: {
    rules: rules,
  },
};
