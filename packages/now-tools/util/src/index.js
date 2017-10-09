'use strict';

import cookie from 'now-util-cookie'
import localStorageHandler from 'now-util-localstorge'
import device from 'now-util-device'
import url from 'now-util-url'
import webp from 'now-util-webp'

const _  = {
    /**
     * 扩展自身或者其它
     * @param {?String|Object} namespace namespace|target
     * @param {...Object} args 
     * @return {Object} 
     */
    extend: function(namespace) {
        var args = [].slice.call(arguments);
        if (typeof namespace === 'string') {
            args[0] = _[namespace] || {};
            return _[namespace] = _.extend.apply(_, args);
        } else if (args.length === 1) {
            args.unshift(_);
            return _.extend.apply(_, args);
        } else {
            var target = args[0];
            for (var i = 1; i < args.length; i++) {
                for (var k in args[i]) {
                    if (args[i].hasOwnProperty(k)) {
                        target[k] = args[i][k];
                    }
                }
            }
            return target;
        }
    },

    /**
     * 获取查询参数
     * @param {String} name
     * @return {String} 
     */
    query: function(name) {
        if (typeof location === 'undefined' || !location.search) {
            return ''
        }
        let value = location.search
            .match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)')) 
                ? decodeURIComponent(RegExp.$2) : '';

        if (value.match(/<\/?script>/i)) {
            console.wran('参数中包含"<script>"为防止门神反射-XSS漏洞自动去除', name, value);
            // 自动去除
            value = value.replace(/<\/?script>/ig, '');
        }

        return value;
    },

    /**
     * 获取cookie
     * @param {String} name 
     * @return {String} 
     */
    getCookie: function(name) {
        if (typeof document === 'undefined' || !document.cookie) {
            return '';
        }
        return document.cookie
            .match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
                ? decodeURIComponent(RegExp.$2) : '';
    },

    /**
     * 获取QQ号
     * @return {Number}
     */
    uin: function() {
        var u = this.getCookie('uin');
        return u && parseInt(u.replace(/\D/g, ''), 10) || null;
    },

    /**
     * 代码版本 为文件打包压缩之后的md5版本号
     * @type {String}
     */
    codeVersion: (function() {
        if (typeof window === 'undefined' || !window.Error) {
            return 'node server'
        } 

        var err = window.Error && new Error();
        try {
            // 在ios7上没有stack
            err.stack.toString();
        } catch (ex) {
            err = ex;
        }
        return (err && err.stack && err.stack.toString() || '')
            .match(/[_\-]([\dabcdef]{6,8})\.js\b/)
                && RegExp.$1 || '';
    })(),

    param: function(obj) {
        var str = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                var v = typeof obj[k] !== 'undefined' ? obj[k] : '';
                str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return str.join('&');
    }
};

_.extend({
    cookie,
    webp,
    url,
    device,
    localStorage: localStorageHandler
});

export default _
