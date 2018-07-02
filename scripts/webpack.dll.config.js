const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// split your chunks
const vendors = [
  'react',
  'whatwg-fetch',
  'react-dom',
  // 'redux',
  // 'react-redux',
  // 'react-router',
  // 'react-router-redux',
  // 'immutable',
  // 'redux-thunk'
  'react-transition-group',
]

const config = {
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]_[hash].dll.js',
    library: '[name]'
  },
  entry: {
    // add your entrys
    vendor: vendors
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV !== 'production' ? '#source-map' : false,
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '..', 'dist', '[name]-manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } })
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  )
}

module.exports = config
