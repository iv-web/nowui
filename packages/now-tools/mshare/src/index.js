import { mqq } from 'now-util-mqq';

function extend(target) {
    var args = [].slice.call(arguments, 1);
    for (var i in args) {
        var item = args[i];
        for (var k in item) {
            target[k] = item[k];
        }
    }
    return target;
}

function itemprop(name) {
    var node = document.querySelector('meta[itemprop=' + name + ']');
    return node && node.getAttribute('content') || null;
}

function getDescToTitleOpts(opts) {
    opts = extend({}, opts);
    opts.title = opts.descTitle || opts.title + opts.desc;
    opts.desc = '';
    return opts;
}

function wxShare(opts) {
    opts = opts || {};
    opts = extend({
        title: opts.title,
        desc: opts.desc,
        descTitle: opts.descTitle,
        link: opts.link,
        img_url: opts.image
    }, opts.wx || {});

    function _wxReady() {
        WeixinJSBridge.on('menu:share:timeline', function () {
            WeixinJSBridge.invoke('shareTimeline', getDescToTitleOpts(opts));
        });
        WeixinJSBridge.on('menu:share:appmessage', function () {
            WeixinJSBridge.invoke('sendAppMessage', opts);
        });
    }
    if (typeof window.WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', _wxReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', _wxReady);
            document.attachEvent('onWeixinJSBridgeReady', _wxReady);
        }
    } else {
        _wxReady();
    }
}

function mqqShare(opts) {
    opts = opts || {};
    opts = extend({
        title: opts.title,
        desc: opts.desc,
        descTitle: opts.descTitle,
        share_url: opts.link,
        image_url: opts.image,
        onShareHandler: opts.onShareHandler,
        shareMessageCallback: opts.shareMessageCallback
    }, opts.qq || {});

    mqq().then(() => {
        mqq('ui.setOnShareHandler', function(type){
            // type 0: QQ好友 1: QQ空间 2: 微信好友 3:微信朋友圈
            var options = extend({}, opts, { share_type: type });
            if (type === 3) {
                // 朋友圈
                options = getDescToTitleOpts(options);
            }
            if (opts.onShareHandler) {
                options = opts.onShareHandler(type, options) || options;
            }
            mqq('ui.shareMessage', options, function(data){
                if (opts.shareMessageCallback) {
                    opts.shareMessageCallback(type, data);
                }
            });
            // mqq.ui.shareMessage(options, function (data) {});
        });
    })
}

/**
 * 空间分享
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */
function qzoneShare(opts) {
    mqq().then(mqq => {
        mqq.invoke("share","setShare",{
                type:   "share",
                image: [opts.image, opts.image, opts.image, opts.image],
                title:  [opts.title, opts.title, opts.title, opts.title],
                summary:  [opts.desc, opts.desc, opts.desc, opts.desc],
                shareURL:  [opts.link, opts.link, opts.link, opts.link] 
            },function(evt){
                console.log(JSON.stringify(evt.data));
            }
        );
    });
}

function init(opts) {
    opts = extend({
        link: location.href,
        title: itemprop('name'),
        desc: itemprop('description'),
        descTitle: '', // 分享到空间/朋友圈时只有描述, 为空时使用title,desc拼接
        image: itemprop('image'),
        wx: {
            // appid: '' 微信appid决定小尾巴icon
        },
        qq: {
            // appid: '' QQ appid决定小尾巴icon
        }
    }, opts);
    mqqShare(opts);
    qzoneShare(opts);
    wxShare(opts);
    return opts;
}

module.exports = {
    init: init
};
