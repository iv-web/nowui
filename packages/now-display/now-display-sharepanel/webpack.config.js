const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    externals: [
        (context, request, callback) => {
            if (/loader/ig.test(request)) {
                return callback();
            }

            if (/^[^/.]/ig.test(request)) {
                return callback(null, request);
            }
            
            callback();
        },
    ],
    module: {
        loaders: [{
            test: /\.js|jsx$/,
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
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.(png\?.*|jpg\?.*|jpg|png)$/,
            loader: 'url-loader'
        }, {
            test: /\.(blob|svg)$/,
            loader: 'file-loader'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    }
}
