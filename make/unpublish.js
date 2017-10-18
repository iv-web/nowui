'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');

fs.readdir(Path.join(__dirname, '../packages'), (err, modulesType) => {
    let p = Promise.resolve();
    modulesType.map((moduleTypeName) => {
        let p = Promise.resolve();
        fs.readdir(Path.join(__dirname, '../packages', moduleTypeName), (err, libs) => {
            libs.map((lib) => {
                let cwd = Path.join(__dirname, 'packages', lib);
                    p = p.then(() => {
                        return unPublish(cwd, lib)
                            .then((lib) => {
                                console.log(`${cwd} ${lib} finish`)
                            }, (lib) => {
                                console.log(`${cwd} ${lib} fail`)
                            })
                    })
            });
        });
    });
});

function unPublish (cwd, libname) {
    return new Promise((resolve, reject) => {

  
        let command = `npm unpublish ${libname} --force`;
        console.log(`正在执行 ${command}`);
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
          console.log(`disconnect ${cwd} ${libname} `)
        });

        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (code !== 0) {
            reject(libname)
           } else {
            resolve(libname)
           }    
        })
    })
}