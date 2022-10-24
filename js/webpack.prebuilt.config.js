// "jupyter labextension build" will run webpack on its own and use the contents of this file as additional rules.  
// We use less-loader here to get our css injected in properly.
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
        // Prefix antd's global styles to keep them from interfering with notebook styling
        loader: "prefix-css-loader",
        options: {
          // selectors inside :where do not affect specificity - i.e. prefixed rules will not be reordered in priority.
          // NOTE: :where was broadly supported by browsers only after ~Jan 2021
          selector: ":where(.cell-viewer)",
          exclude: /[.#]/, // Only prefix selectors that refer only to tags
          minify: false,
        },
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
            math: "always",
          },
        },
      },
    ],
  },
];

module.exports = {
  module: { rules },
};
