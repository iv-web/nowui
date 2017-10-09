'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');
const owners = require('./developer').user;

let content = `{
  "presets": ["react", ["es2015", {
      "loose": true
    }], "stage-0"]
}`;

fs.readdir(Path.join(__dirname, '../packages'), (err, modulesType) => {
    modulesType.map((moduleTypeName) => {
        let p = Promise.resolve();
        fs.readdir(Path.join(__dirname, '../packages', moduleTypeName), (err, libs) => {
            let cwd = Path.join(libs, '.babelrc');
            p = p.then(() => {
                return new Promise((resolve, reject) => {
                    fs.writeFile(cwd, content, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(cwd, 'finish')
                            }
                            resolve()
                        })  
                })
            })
        });
    });
});