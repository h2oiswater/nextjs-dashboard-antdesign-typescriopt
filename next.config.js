/* eslint-disable */
const withLess = require('@zeit/next-less')
const withTypescript = require("@zeit/next-typescript")

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withTypescript(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {
      'primary-color': '#1DA57A',
      'link-color': '#1DA57A',
      'border-radius-base': '2px',
    },
  }
}))