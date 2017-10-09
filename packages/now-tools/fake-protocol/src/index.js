import device from 'device';

function getUrl(url, param) {
    if (param) {
        url = url + (url.match(/\?/) ? '&' : '?') + getParam(param);
    }
    return url;
}

function getParam(obj) {
    var str = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            var v = typeof obj[k] !== 'undefined' ? obj[k] : '';
            str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
};

function callByLocaiton(url, param) {
    url = getUrl(url, param);
    window.location = url;
}

function callByIframe(url, param) {
    url = getUrl(url, param);
    const iframe = document.createElement('iframe'),
        body = document.getElementsByTagName('body')[0];

    body.appendChild(iframe);

    const style = {
        position: 'fixed',
        zIndex: -1,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        margin: 0,
        padding: 0,
        border: 'none',
        opacity: 0,
        visibility: 'hidden'
    };
    for (let k in style) {
        iframe.style[k] = style[k];
    }
    iframe.src = url;

    setTimeout(function() {
        body.removeChild(iframe);
    }, 2000);
}

function callProto(url, param) {
    if (navigator.userAgent.match(/\bSafari\/\S+$/)// IOS在safari等设备中iframe无效
        && navigator.userAgent.match(/\b(iPhone|iPad|iPod)\b/)
    ) {
        callByLocaiton(url, param);
    } else {
        callByIframe(url, param);
    }
}

const callWithPromise = (function() {
    let callBackCount = 0;

    return function (url, opts = {}) {
        return new Promise((resolve, reject) => {
            let callbackName = '';

            if(!opts.callback) {
                callbackName = `FAKEPRO_CALLBACK_${callBackCount++}`;
                opts.callback = callbackName;
            } else {
                callbackName = opts.callback;
            }

            window[callbackName] = function(data) {
                resolve(data);
                delete window[callbackName];
            }

            callProto(url, opts);
        });
    }
})();

module.exports = {
    getUrl: getUrl,
    call: callProto,
    callByLocaiton: callByLocaiton,
    callByIframe: callByIframe,
    callWithPromise
};