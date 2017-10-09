'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');
const owners = require('./developer').user;

let content = `test
make
tmp`;

fs.readdir(Path.join(__dirname, '../packages'), (err, libs) => {
    let p = Promise.resolve();
    libs.map((libName) => {
        let cwd = Path.join(__dirname, '../packages', libName, '.npmignore');
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
    })
});