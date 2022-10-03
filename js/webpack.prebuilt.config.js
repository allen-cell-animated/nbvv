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
