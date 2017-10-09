'use strict'

var cache = {}

function get(url) {
    if (cache[url]) {
        if (cache[url] instanceof Image) {
            return Promise.resolve(cache[url]);
        } else {
            // promise
            return cache[url];
        }
    } else {
        return cache[url] = new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                cache[url] = img;
                resolve(img);
            };
            img.onerror = function() {
                cache[url] = null;
                resolve(null);
            };
            img.src = url;
        });
    }
}

var imageCache = {
    get: get
}

export default imageCache