'use strict';

var url = {
    /**
     * 设置hash
     * @param name
     */
    setHash: function (name) {
        setTimeout(function() {
            location.hash = name;
        }, 0);
    },

    /**
     * 获取当前url中的hash值
     * @param url
     * @return String
     */
    getHash: function (url) {
        var u = url || location.hash;
        return u ? u.replace(/.*#/, "") : "";
    },

    /*
     * 从hash中获取name对应的值
     */
    getHashParam: function (name) {
        var result = this.getHash().match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), "i");
        return result != null ? result[2] : "";
    },

    /*
     *  从URL中获取参数对应的值
     */
    getUrlParam: function (name, url) {
        //参数：变量名，url为空则表从当前页面的url中取
        var u = arguments[1] || window.location.search,
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = u.substr(u.indexOf("\?") + 1).match(reg);
        return r != null ? r[2] : "";
    },

    parseUrl: function (url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }
};

export default url