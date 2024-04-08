const prefixer = require('postcss-prefixwrap');

module.exports = {
  plugins: [
    prefixer(':where(.cell-viewer)', {
      ignoredSelectors: [/[.#]/],
      prefixRootTags: true
    })
  ]
};
