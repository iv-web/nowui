'use strict';

const cookie = {
    get: function (name) {
        //读取COOKIE
        if(typeof document === 'undefined' || !document.cookie) {
            return ''
        }
        var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
            val = document.cookie.match(reg);
        return val ? (val[2] ? unescape(val[2]) : "") : null;
    },

    set: function (name, value, expires, path, domain, secure) {
        //写入COOKIES
        if(typeof document === 'undefined' || !document.cookie) {
            return ''
        }
        var exp = new Date(),
            expires = arguments[2] || null,
            path = arguments[3] || "/",
            domain = arguments[4] || null,
            secure = arguments[5] || false;
        expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
        document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    },

    del: function (name, path, domain, secure) {
        //删除cookie
        if(typeof document === 'undefined' || !document.cookie) {
            return ''
        }
        var value = this.get(name);
        if (value != null) {
            var exp = new Date();
            exp.setMinutes(exp.getMinutes() - 1000);
            path = path || "/";
            document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        }
    }
};

export default cookie