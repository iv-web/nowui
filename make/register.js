'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');
const owners = require('./developer').user;

fs.readdir(Path.join(__dirname, '../packages'), (err, libs) => {
    let p = Promise.resolve();
    libs.map((libName) => {
        let cwd = Path.join(__dirname, '../packages', libName);
        p = p.then(() => {
            owners.map((owner) => {
                p = p.then(() => {
                    return addUser(cwd, owner)
                    .then((userName) => {
                        console.log(`${cwd} ${userName} finish`)
                    }, (userName) => {
                        // let index = owners.indexOf(userName)
                        // if (index) {
                        //     owners.splice(index, 1)
                        // }
                        // console.log(`删除 ${userName}`)
                    })
                })
            })
        })
    })
});

function addUser (cwd, userName) {
    return new Promise((resolve, reject) => {
        console.log(`正在执行 ${cwd} ${userName}`);

        let command = `tnpm owner add ${userName}`;
        let error = true;
        let ls = exec(command, {
            cwd: cwd
        });

        ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        ls.on('disconnect', (code) => {
          console.log(`disconnect ${cwd} ${userName} `)
        });

        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (code !== 0) {
            reject(userName)
           } else {
            resolve(userName)
           }    
        })
    })
}