'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');
const owners = require('./developer').user;

let content = {
    "presets": ["react", ["env", {
        "targets": {
            "browsers": ["Android >= 2.3", "iOS >= 6"],
        }
    }], "stage-0"]
}


fs.readdir(Path.join(__dirname, '../packages'), (err, libs) => {
    let p = Promise.resolve();
    libs.map((libName) => {
        fs.readdir(Path.join(__dirname, '../packages', libName), (err, moduleNames) => {
            moduleNames.map((moduleName) => {
                let cwd = Path.join(__dirname, '../packages', libName, moduleName, '.babelrc');
                // fs.unlinkSync(Path.join(__dirname, '../packages', libName, '@tencent', moduleName, '.bablerc'));

                p = p.then(() => {
                    return new Promise((resolve, reject) => {
                        fs.writeFile(cwd, JSON.stringify(content, null ,2), (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(cwd, 'finish')
                                }
                                resolve()
                            })  
                    })
                })
            })
        })
    })
})