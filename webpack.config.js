const path = require('path');
const fs = require('fs');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const fallbackPath = fs.readdirSync(path.join(__dirname, './packages')).map((filename) => {
    return path.join(__dirname, './packages', filename);
})

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'nowui.min.js'
    },
    resolve: {
        fallback: fallbackPath,
    },
    module: {
        loaders: [{
            test: /.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: ['add-module-exports'],
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
            test: /.(svg)$/,
            loader: 'svg-inline-loader'
        }, {
            test: /.json$/,
            loader: 'json'
        }]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
}
