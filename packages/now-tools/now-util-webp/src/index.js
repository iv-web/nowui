/**
 * 如果支持webp 会把标示存到cookie中（_supWebp），7天
 * 使用的时候可以先判断 supportedWebP 如果否 在调用 isSupportedWebP 并传入回调函数
 * @returns {{supportedWebPQueue: Array, supportedWebP: undefined, supportedWebPIsLoading: boolean, isSupportedWebP: isSupportedWebP}}
 *
 * isSupportedWebP 如果不传回调函数 返回是否支持webp true 支持 false 不支持 undefined 还不知道支不支持这时需要传回调函数异步判断下
 */
import cookie from 'now-util-cookie'

function isSupWebp() {

    var obj = {
        'supportedWebPQueue': [],
        'supportedWebP': cookie.get('_supWebp') || undefined,
        'supportedWebPIsLoading': false,
        'isSupportedWebP': isSupportedWebP
    };

    /**
     *
     * @param cb 回调函数 传入是否支持web的参数
     */
    function isSupportedWebP(cb) {

        if (obj.supportedWebP == '1') {
            obj.supportedWebP = true;
        } else if (obj.supportedWebP == '0') {
            obj.supportedWebP = false;
        }

        var execute = function () {
            for (var i = 0, len = obj.supportedWebPQueue.length; i < len; i++) {
                obj.supportedWebPQueue[i](obj.supportedWebP);
            }
            obj.supportedWebPQueue = [];
        };
        if (obj.supportedWebP === undefined) {
            cb && obj.supportedWebPQueue.push(cb);
            // 判断下 Image 必须存在之后，才执行以下代码，否则会导致 node 环境执行时直接报错
            if (!obj.supportedWebPIsLoading && (typeof Image !=='undefined') ) {
                obj.supportedWebPIsLoading = true;

                var $img = new Image(),
                    callback = function(result) {
                        obj.supportedWebP = result;
                        obj.supportedWebPIsLoading = false;
                        cookie.set('_supWebp', result ? 1 : 0, 7 * 24 * 60);
                        execute();
                    };
                $img.onload = function () {
                    callback(this.width === 2 && this.height === 1);
                };
                $img.onerror = function () {
                    callback(false);
                };
                $img.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";
            }
        } else {
            cb && cb(obj.supportedWebP);
        }
        return obj.supportedWebP;
    }

    isSupportedWebP();

    return obj
}


var webp = {
    webp: isSupWebp()
};

module.exports = webp;


