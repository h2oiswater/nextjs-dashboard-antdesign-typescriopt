// next.config.js
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path')

module.exports = withTypescript(
  withSass({
    cssModules: true,
    webpack(config, options) {
      // Do not run type checking twice:
      if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin({tsconfig: path.resolve(__dirname, './tsconfig.json')}))
      
      return config
    }
  })
)