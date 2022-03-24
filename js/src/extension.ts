if ((window as any).require) {
  (window as any).require.config({
    map: {
      "*": {
        nbvv: "nbextensions/nbvv/index",
        "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension",
      },
    },
  });
}

// Export the required load_ipython_extention
export function load_ipython_extension() {}
// module.exports = {
//   load_ipython_extension: function () {},
// };
