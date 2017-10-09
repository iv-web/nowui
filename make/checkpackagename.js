'use strict';

/** lerna 发布失败时，会引起版本混乱， 使用此脚本修复 **/
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const colors = require('colors');
const Path = require('path');

const packageNameMap = {};
const errorPath = {};

let p = Promise.resolve();
let flag = false;

fs.readdirSync(Path.join(__dirname, '../packages')).forEach((moduleTypeName) => {
    var modulePath = Path.join(__dirname, '../packages', moduleTypeName, '@tencent');
    fs.readdirSync(modulePath).forEach((lib) => {
        var packagePath = Path.join(modulePath, lib, 'package.json');
        if(fs.existsSync(packagePath)) {
            var packageJson = require(packagePath);

            if(!packageNameMap[packageJson.name]) {
                packageNameMap[packageJson.name] = packagePath;
            } else {
                if(errorPath[packageJson.name]) {
                    errorPath[packageJson.name].push(packagePath);
                } else {
                    errorPath[packageJson.name] = [packagePath, packageNameMap[packageJson.name]];
                }
            }          
        }
    });
});

if(Object.keys(errorPath).length > 0 ) {
    console.log("[ERROR] 发现有重名包，已中断发布，请先检查发布包名!".bgRed);

    for(let packName in errorPath) {
        console.log(
`${packName.bgBlack}:
    ${errorPath[packName].join('\n    ').red}
`
);
    }
    process.exit();
} else {
    console.log("packageName 检查通过...".bgGreen);
}