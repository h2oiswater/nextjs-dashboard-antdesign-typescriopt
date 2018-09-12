// next.config.js
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withCss(withTypescript(
  withSass({
    // useFileSystemPublicRoutes: false, // 是否开启路径对应url
    webpack(config, options) {
      // Do not run type checking twice:
      if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin({tsconfig: path.resolve(__dirname, './tsconfig.json')}))
      return config
    }
  })
))