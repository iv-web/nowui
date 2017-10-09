const fs = require('fs');
const Path = require('path');
const os = require('os');

const {
    promisify
} = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readDirAsync = promisify(fs.readdir);
const accessAsync = promisify(fs.access);
const statSync = promisify(fs.stat);

const maintainers = [{
    'email': 'ivwebt@gamil.com',
    'name': 'ivwebteam'
}];

const excludeModule = ['now-base-lazyload'];

function copyFile(src, dist) {
    const text = fs.readFileSync(src, 'utf-8').toString().replace(/@tencent\//ig, '');
    fs.writeFileSync(dist, text);

    console.log(src);
}

function formatContent(content) {
    return content.replace(/\/@tencent/ig, '')
                .replace(/@tencent\//ig, '')
                .replace(/tnpm\s?/, 'npm ')
                .replace(/\r\n/ig, '\n')
}

function copy(err, src, dist) {
    readDirAsync(src)
        .then((paths) => {
            paths.forEach((path) => {
                const _src = src + '/' + path;
                const _dist = dist + '/' + path;
                statSync(_src)
                .then((stat) => {
                    // 判断是文件还是目录
                    if(stat.isFile()) {
                        readFileAsync(_src, 'utf-8')
                            .then((content) => {
                                console.log(`${src} finish`)
                                return writeFileAsync(_dist, formatContent(content.toString()));
                            })
                    } else if(stat.isDirectory()) {
                        // 当是目录是，递归复制
                        copyDir(_src, _dist)
                    }
                })
            })
        })
}

function copyDir(src, dist) {
    accessAsync(dist)
        .then(() => {
            copy(null, src, dist);
        }, () => {
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        })
}

fs.readdir(Path.join(__dirname, '../packages'), (err, modulesType) => {
    modulesType.forEach((moduleTypeName) => {
        let p = Promise.resolve();
        fs.readdir(Path.join(__dirname, '../packages', moduleTypeName), (err, libs) => {
            libs.forEach((lib) => {
                if(excludeModule.indexOf(lib) > -1) {
                    return;
                }

                const targetDir = Path.join(__dirname, '../packages', moduleTypeName, lib);

                const srcDir = Path.join('E:\\FE\\now-design\\packages', moduleTypeName, '@tencent', lib);
                // const packageJSONPath = Path.join(cwd, 'package.json');
                // copyFile(srcPackage, packageJSONPath);

                copyDir(srcDir, targetDir)
            });
        });
    });
});
