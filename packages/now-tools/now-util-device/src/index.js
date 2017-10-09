'use strict';

function getUa() {
    if(typeof navigator !== 'undefined') {
        if (typeof navigator.userAgent !== 'undefined') {
            return navigator.userAgent
        }
    }
    return ''
}

const device = {
    isH5: /(Android|iPhone|iPad|iPod|iOS|Windows Phone)/i.test(getUa()), //手机
    isQQ: /\b(V1_AND_SQI?_([\d\.]+))|(.*? QQ\/([\d\.]+))/.test(getUa()), //手Q
    isQQPA: /.*? PA QQ\/([\d\.]+)/.test(getUa()), //手Q公众号（注：仅android下有效，iOS下无法区分是否公众号）
    isWX: /\bMicroMessenger\/([\d\.]+)/.test(getUa()), //微信
    isiOS: /(iPad|iPhone|iPod).*? (IPad)?/.test(getUa()), //iOS
    isAndroid: /\bandroid/i.test(getUa()), //Android
};

export default device


