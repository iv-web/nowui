
const regexp = [
    [ 'IOS', /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/, 2],
    [ 'android', /\bAndroid\s*([^;]+)/ ],
    [ 'QQBrowser', /\bMQQBrowser\/([\d\.]+)/ ],
    [ 'nowSDK', /\bNowSDK\/([\d\.]*)/i ], // now结合版
    [ 'QQ', /\bQQ\/([\d\.]+)/ ],
    [ 'weixin', /\bMicroMessenger\/([\d\.]*)/ ],
    [ 'now', /\bNow\/(\d+|LocalCompiled)/ ],
    [ 'nowDev', /\bNow\/LocalCompiled/ ],
    [ 'jiaoyou', /\bODApp\/([\d\.]+|LocalCompiled)/ ],
    [ 'jiaoyouDev', /\bODApp\/LocalCompiled/ ],
    [ 'huayang', /\bhuayangapp\/([\d\.]*)/ ],
    [ 'qzone', /\bQzone\/\w*_([\d\.]+)/ ],
    [ 'comicReader', /\bQQAC_Client(_\w+)?\/([\d\.]*)/i ], // 动漫
    [ 'weibo', /\bweibo/i] //微博
];

function getUa() {
    return typeof navigator !== 'undefined' && navigator && navigator.userAgent || '';
}

function isArray(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Array]';
}

function Up(str) {
    return str.replace(/^./, (ch) => ch.toUpperCase());
}

/*
 * 当a<b返回-1, 当a==b返回0, 当a>b返回1,
 * 约定当a或b非法则返回-1
 *
 * ps：该方法从qqapi.js中移植过来的
 */
function compare(a, b) {
    var i, l, r, len;

    a = String(a).split('.');
    b = String(b).split('.');

    // try {
    for (i = 0, len = Math.max(a.length, b.length); i < len; i++) {
        l = isFinite(a[i]) && Number(a[i]) || 0;
        r = isFinite(b[i]) && Number(b[i]) || 0;
        if (l < r) {
            return -1;
        } else if (l > r) {
            return 1;
        }
    }

    // } catch (e) {
    //     console.error(e);
    //     return -1;
    // }

    return 0;
}

const entry = {
    userAgent: getUa,

    init() {
        regexp.forEach((args) => {
            this.addItem.apply(this, args);
        });

        this.platform = this.isIOS ? 'ios' : (this.isAndroid ? 'android' : 'pc');

        regexp.forEach((args) => {
            const [ name ] = args;
            if (this['is' + Up(name)]) {
                this.type = name;
            }
        });

        // 网络类型
        this.netType = getUa().match(/NetType\/(\w+)/i) && RegExp.$1.toUpperCase();

        // 机型，主要是安卓机型，例如 HUAWEI C8825D，SAMSUNG-GT-I9308_TD 等
        this.model = getUa().match(/\(.*;\s?(\S*?\s?\S*?)\s?(Build)?\//i) && RegExp.$1;
    },

    addItem(name, exp, verPos = 1) {
        const match = getUa().match(exp);
        const version = (match && match[verPos] || '').replace(/_/g, '.') || null;
        this['is' + Up(name)] = !!match;
        this[name + 'Version'] = version;
        this[name + 'Upper'] = this._upper.bind(this, name);
        this[name + 'Lower'] = this._lower.bind(this, name);
        this[name + 'Compare'] = this._compare.bind(this, name);
    },

    _upper(name, ver) {
        const v = this.version(name);
        return v && compare(v, ver) >= 0 || false;
    },

    _lower(name, ver) {
        const v = this.version(name);
        return v && compare(v, ver) <= 0 || false;
    },

    _compare(name, ver) {
        const v = this.version(name);
        return v ?  compare(v, ver) : -2;
    },

    /**
     * 获取版本
     * @param {String} keyword 
     * @return {String} 
     */
    version(name) {
        return this[name + 'Version'] || null;
    }
};

entry.init();

module.exports = entry;

