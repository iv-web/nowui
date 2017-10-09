var webp = require('now-util-webp');

function pic(url, size, svr, useRaw) {
    url = url || '';

    /* 域名限制 */
    const servers = {
        'shp.qlogo.cn': true,
        'p.qpic.cn': true,
        'p.qlogo.cn': true,
        'pic.url.cn': true,
        'qpic.url.cn': true
    };

    const domain = url.match(/\/\/([^\/]+)\//) && RegExp.$1 || '';

    if (url) {
        // 去除协议头
        url = url.replace(/^https?:/, '');

        if (/\.(png|jpg|jpeg|gif)$/.test(url) || url.match(/\?/)) {
            return url;
        }

        if (size && servers[domain]) {
            url = url.replace(/(\/\d*)?$/, '/' + size);
        }

        // webp
        if (webp.webp.supportedWebP) {
            url = url + (url.match(/\?/) ? '&' : '?') + 'tp=webp';
        }

        // http
        if (useRaw) {
            url = url.match(/^http/) ? url : ('http:' + url); // 补上http
            url = url.replace(/\?.*/, ''); // 去除webp参数
        }
    }
    return url;
}

module.exports = pic;
