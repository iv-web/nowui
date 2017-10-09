import device from 'device';

/**
 * 调用mqq接口
 * @param {String} calls 
 * @param {Object..} args 
 * @example 
 *  _.mqq('ui.showProfile', {uin: ''})
 */
 exports.mqq = function (calls, ...args) {
     var url = window.pack 
         ? '//8.url.cn/now/lib/4/qqapi.js?_bid=2400'
         : '//8.url.cn/now/lib/4/qqapi.js';
     if (device.isQzone) {
         url = '//8.url.cn/now/lib/4/qqapi.js?_offline=1';
     }

     return (
         window.mqq && mqq.version ? Promise.resolve() : loadScript({
             url: url, 
             retry: true,
             crossOrigin: window.pack ? false : true
         })
     )
     .then(() => {
         if (calls) {
             var p = calls.split(/\./),
                 obj = window.mqq,
                 method = p[p.length - 1];
             if(!obj) {
                console.log('mqq 加载失败');
                return Promise.reject();
             }
             p.slice(0, -1).forEach(function(name) {
                 obj = obj[name]
             });
             obj[method].apply(obj, args)
         }
         return window.mqq;
     });
};

/**
 * 调用weixin接口
 * @param {Object..} args 
 */
exports.weixin = function () {
    var args = [].slice.call(arguments);
    return new Promise(function(resolve, reject) {
        function succ() {
            if (typeof window.WeixinJSBridge !== 'undefined' 
                && typeof window.WeixinJSBridge.invoke === 'function'
            ) {
                resolve && resolve(window.WeixinJSBridge);
                resolve = null;
            } else {
                console.log('WeixinJSBridge 加载失败');
            }
        }

        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', succ, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', succ);
            document.attachEvent('onWeixinJSBridgeReady', succ);
        }

        succ();
    }).then(function(jsbridge) {
        if (args.length) {
            jsbridge.invoke.apply(jsbridge, args);
        }
        return jsbridge;
    })
};

/**
 * 加载微信
 */
exports.wx = function(calls, ...args) {
    return (
        window.wx ? Promise.resolve() : loadScript({
            url: '//res.wx.qq.com/open/js/jweixin-1.1.0.js', 
            retry: true
        })
    )
    .then(() => {
        if (calls) {
            var p = calls.split(/\./),
                obj = window.wx,
                method = p[p.length - 1];

            if(!window.wx) {
                console.log('wx 加载失败');
                Promise.reject();
            }

            p.slice(0, -1).forEach(function(name) {
                obj = obj[name]
            });
            obj[method].apply(obj, args)
        }
        return window.wx
    })
};

/**
 * 加载脚本
 * @param {Object} opts
 * @param {String} opts.url
 * @param {Boolean} opts.crossOrigin 是否设置crossOrigin = anonymous 
 */
function loadScript(opts) {
    if (typeof opts === 'string') {
        opts = {
            url: opts
        };
    }
    var url = opts.url;
    loadScript.loading = loadScript.loading || {};
    return loadScript.loading[url] = loadScript.loading[url] || new Promise((resolve, reject) => {
        var script = document.createElement('script');
        var onload = function() {
            setTimeout(resolve, 30);
        };
        if ('onload' in script) {
            script.onload = onload;
        } else {
            script.onreadystatechange = function () {
                if (this.readyState === 'loaded' 
                    || this.readyState === 'complete'
                ) {
                    onload();
                }
            };
        }
        script.onerror = reject;
        script.type = 'text/javascript';
        script.async = false;
        if (opts.crossOrigin) {
            script.crossOrigin = 'anonymous';
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }).catch(() => {
        // retry
        if (opts.retry) {
            loadScript.loading[url] = null;
            return loadScript(Object.assign({}, opts, {
                retry: false
            }));
        } else {
            return Promise.reject();
        }
    });
}

