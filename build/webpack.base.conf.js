var path = require('path')
var merge = require('webpack-merge')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: './src/entryPoint.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'bfGDPRcookie.js',
    publicPath: isDev
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
			},
    ]
  },
  plugins: [
    ...utils.pageFile(isDev),
  ]
}
