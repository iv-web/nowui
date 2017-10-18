function loadModule() {
    const req = require.context('./packages', true, /now-(.*)\/now-(.*)-(.*)\/src\/index.js$/)

    const reg = /now-[^/]*\/now-([^-/]*)-([^/]*)\/src\/index.js$/i

    return req.keys().reduce((obj, key) => {
        const [, namespace, name] = key.match(reg)

        if(!obj[namespace]) {
            obj[namespace] = {}
        }

        obj[namespace][name.replace(/-/ig, '')] = req(key)
        
        return obj
    }, {})
}

window.Now = loadModule()

window.React = require('react')

window.ReactDom = require('react-dom')

module.export = window.Now;
