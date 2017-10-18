'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const writeAsync = promisify(fs.writeFile);
const rmdirAsync = promisify(fs.rmdir);

let content = `const path = require('path');
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
}`;

fs.readdir(Path.join(__dirname, '../packages'), (err, libs) => {
    let p = Promise.resolve();
    libs.forEach((libName) => {
        fs.readdir(Path.join(__dirname, '../packages', libName), (err, moduleNames) => {
            moduleNames.forEach((moduleName) => {
                const cwd = Path.join(__dirname, '../packages', libName, moduleName, 'webpack.config.js');
                p = p.then(() => {
                    return writeAsync(cwd, content)
                })
                .then(() => {
                    console.log(cwd, 'finish')
                }, () => {
                    console.log(err)
                })
                .then(() => {
                    deleteFolderRecursive(Path.join(__dirname, '../packages', libName, moduleName, 'lib'))
                    // return rmdirAsync(Path.join(__dirname, '../packages', libName, moduleName, 'lib'))
                })
                // .then(() => {
                //     console.log(`del finish ${Path.join(__dirname, '../packages', libName, moduleName, 'lib')}`)
                // }, (err) => {
                //     console.log(`${err}`)
                // })
            })
        })
    })
})

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};