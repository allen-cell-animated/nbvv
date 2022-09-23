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
  {
    test: /\.less$/,
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
