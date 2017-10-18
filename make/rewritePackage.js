'use strict';

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');
const Path = require('path');

let scripts = {
    "test": "mocha --compilers js:babel-core/register --require ./test/setup.js",
    "prepublish": "webpack",
    // "build": "babel src -d lib  --copy-files && npm publish",
    "dev": "babel src -d lib -w"
};

let maintainers = [
    {
        'email': 'ivwebt@gamil.com',
        'name': 'ivwebteam'
    }
];

fs.readdir(Path.join(__dirname, '../packages'), (err, libs) => {
    let p = Promise.resolve();
    libs.map((libName) => {
        fs.readdir(Path.join(__dirname, '../packages', libName), (err, moduleNames) => {
            moduleNames.map((moduleName) => {
                let cwd = Path.join(__dirname, '../packages', libName, moduleName);

                p = p.then(() => {
                    return new Promise((resolve, reject) => {
                        let packageJSONPath = Path.join(cwd, 'package.json');
                        let packageJSON = require(packageJSONPath);
        
                        if (packageJSON.scripts) {
                            packageJSON.scripts = scripts
                        }
        
                        // if (packageJSON.main) {
                        //     if (packageJSON.main.indexOf('index' < 0) && packageJSON.main !== 'index.js') {
                        //         packageJSON.main = packageJSON.main.replace(/dist/ig, 'lib')
                        //     } else {
                        //         packageJSON.main = 'src/index.js'
                        //     }
                        // } else {
                            packageJSON.main = 'src/index.js'
                        // }
        
                        packageJSON.babel = {
                            presets: ['react', ['env', {
                                targets: {
                                    browsers: ['Android >= 2.3', 'iOS >= 6'],
                                }
                            }], 'stage-0']
                        }
                        
                        delete packageJSON.babelrc

                        if(packageJSON.author) {
                            packageJSON.author = {
                                name: 'ivweb'
                            }
                        }

                        if(packageJSON.dependencies) {
                            if(packageJSON.dependencies.react) {
                                packageJSON.dependencies.react = "^15.0.0 || ^16.0.0"
                            }
                            if(packageJSON.dependencies['react-dom']) {
                                packageJSON.dependencies['react-dom'] = "^15.0.0 || ^16.0.0"
                            }
                        }
        
                        packageJSON.maintainers = maintainers;
        
                        fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null ,2), (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(cwd, 'finish')
                                }
                                resolve()
                            })  
                    })
                }, (error) => {
                    console.log(error)
                })
                    
            })
        })
    })
});