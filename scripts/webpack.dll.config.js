const webpack = require('webpack')
const path = require('path')

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
    'react-addons-css-transition-group',
]

const config = {
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '..', 'dist', 'manifest.json'),
            name: '[name]',
            context: __dirname
        })
    ]
}

module.exports = config