const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssertHtmlPlugin = require('add-asset-html-webpack-plugin')
const poststylus = require('poststylus')
const values = require('postcss-modules-values')

const config = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react-hot-loader/patch',
    './src/App.jsx'
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [path.resolve(__dirname, '..', 'node_modules')],
      use: ['babel-loader']
    }, {
      test: /.styl$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', 'stylus-loader' ]
      })
    }, {
      test: /.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?modules=true&camelCase=true&localIdentName=[name]_[local]-[hash:base64]&sourceMap=true',
          'postcss-loader'
        ]
      })
    }, {
      test: /.css$/,
      include: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{loader: 'url-loader', options: {limit: 500, name: '[name]-[hash].[ext]'}}]
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}]
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/octet-stream'}}]
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'file-loader'}]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/svg+xml'}}]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Template',
      inject: 'body',
      template: path.resolve(__dirname, 'template.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].[hash:8].js',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: 'app.[contenthash:8].css',
      disable: false,
      allChunks: true
    }),
    new AddAssertHtmlPlugin({
      filepath: path.resolve(__dirname, '..', 'dist', '*.dll.js'),
      includeSourcemap: process.env.NODE_ENV !== 'production'
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      stylus: {
        default: {
          use: [poststylus([require('autoprefixer')])]
        }
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.styl']
  }
}

// your chunks name here
const dllRefs = ['vendor']
dllRefs.forEach(x => {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`../dist/${x}-manifest.json`)
    })
  )
})

module.exports = config
