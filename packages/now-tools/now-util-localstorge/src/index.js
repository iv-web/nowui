'use strict'

const localStorageHandler = {
    getItem: function(name) {
        if(typeof localStorage ==='undefined') {
            return ''
        }
        var str = localStorage.getItem(name) || 'null';
        try {
            return JSON.parse(str) || null;
        } catch (ex) {
            localStorageHandler.removeItem(name); // remove bad data
            return null;
        }
    },
    setItem: function(name, value) {
        if(typeof localStorage ==='undefined') {
            return ''
        }
        try {
            localStorage.setItem(name, JSON.stringify(value));
        } catch (ex) {
        }
    },
    removeItem: function(name) {
        if(typeof localStorage ==='undefined') {
            return ''
        }
        try {
            localStorage.removeItem(name);
        } catch (ex) {
        }
    }
}

export default localStorageHandler

