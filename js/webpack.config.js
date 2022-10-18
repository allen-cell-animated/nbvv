const path = require("path");
const version = require("./package.json").version;

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
const rules = [
  {
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"],
  },
  {
    test: /\.css$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      "resolve-url-loader",
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
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

module.exports = [
  {
    // Notebook extension
    //
    // This bundle only contains the part of the JavaScript that is run on
    // load of the notebook. This section generally only performs
    // some configuration for requirejs, and provides the legacy
    // "load_ipython_extension" function which is required for any notebook
    // extension.
    //
    entry: "./lib/extension.js",
    output: {
      filename: "extension.js",
      path: path.resolve(__dirname, "../share/jupyter/nbextensions/nbvv"),
      library: {
        type: "amd",
      },
    },
    module: { rules: rules },
  },
  {
    // Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    //
    entry: "./lib/index.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "../share/jupyter/nbextensions/nbvv"),
      library: {
        type: "umd",
      },
      publicPath: "/nbextensions/nbvv/",
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    externals: ["@jupyter-widgets/base"],
  },
  {
    // Embeddable nbvv bundle
    //
    // This bundle is generally almost identical to the notebook bundle
    // containing the custom widget views and models.
    //
    // The only difference is in the configuration of the webpack public path
    // for the static assets.
    //
    // It will be automatically distributed by unpkg to work with the static
    // widget embedder.
    //
    // The target bundle is always `dist/index.js`, which is the path required
    // by the custom widget embedder.
    //
    entry: "./lib/embed.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        name: "nbvv",
        type: "umd",
      },
      publicPath: "https://unpkg.com/nbvv@" + version + "/dist/",
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    externals: ["@jupyter-widgets/base"],
  },
];
