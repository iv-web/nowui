const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js'
    },
    externals: {
        'react': 'react',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', ['es2015', {
                    'loose': true
                }], 'stage-0'],
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
    },
    plugins: [
        new UglifyJSPlugin()
    ]
}
