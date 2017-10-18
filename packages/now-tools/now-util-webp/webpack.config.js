const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', ['env', {
                    targets: {
                        browsers: ['Android >= 2.3', 'iOS >= 6'],
                    }
                }], 'stage-0']
            },
        }, {
            test: /.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /.(png?.*|jpg?.*|jpg|png)$/,
            loader: 'url-loader'
        }, {
            test: /.(blob|svg)$/,
            loader: 'file-loader'
        }, {
            test: /.json$/,
            loader: 'json'
        }]
    }
}