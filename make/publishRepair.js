'use strict';

/** lerna 发布失败时，会引起版本混乱， 使用此脚本修复 **/
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');

fs.readdir(Path.join(__dirname, '../packages'), (err, modulesType) => {
    modulesType.map((moduleTypeName) => {
        let p = Promise.resolve();
        fs.readdir(Path.join(__dirname, '../packages', moduleTypeName, '@tencent'), (err, libs) => {
            libs.map((lib) => {
                let cwd = Path.join(__dirname, '../packages', moduleTypeName, '@tencent', lib);
                let packageName = `@tencent/${lib}`
                p = p.then(() => {
                        return shouldInstall(cwd, packageName);
                    })
                    .then(() => {
                        return forcePublish(cwd, packageName);
                    }, (error) => {
                        console.log(error);
                        // let index = owners.indexOf(userName)
                        // if (index) {
                        //     owners.splice(index, 1)
                        // }
                        // console.log(`删除 ${userName}`)
                    });
            });
        });
    });
});

/** 检查package.json 中对应的版本是否已经发布 */
function shouldInstall (cwd, packageName) {
    return new Promise((resolve, reject) => {
        console.log(`正在检查 ${cwd} `);
        let packageJSONPath = Path.join(cwd, 'package.json');
        let packageJSON = require(packageJSONPath);
        let version = packageJSON.version;

        if(!version) {
            console.log(`${cwd} 不存在版本号`);
            return reject();
        }

        version = version.trim();
        let command = `tnpm view ${packageName}@${version} version`;
        let error = true;
        let ls = exec(command, {
            cwd: cwd
        });

        let result = ''

        ls.stdout.on('data', (data) => {
            result += data;
        });

        ls.stderr.on('data', (data) => {
            console.log(`${cwd}: ${data}`);
        });

        ls.on('disconnect', (code) => {
            console.log(`disconnect ${cwd}`)
        });

        ls.on('close', (code) => {
            if (code !== 0) {
                reject(cwd)
            } else {
                if(result.trim() !== version) {
                    resolve()
                } else {
                    reject(cwd);
                }
            }    
        });
    });
}


function forcePublish (cwd, packageName) {
    return new Promise((resolve, reject) => {
        console.log(`正在发布 ${packageName} `);

        let command = `tnpm publish`;
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
          console.log(`disconnect ${cwd}`)
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code !== 0) {
                reject(cwd)
            } else {
                resolve(cwd)
            }    
        })
    })
}