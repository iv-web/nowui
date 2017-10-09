/**
 * 根据类型生成气泡的构造函数
 */

let urlMap = {
    'default': `data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAjVBMVEUAAAAF1IEF1IEF1IA+/6cF
04EG1IEF1IAF1IAG1YEI1YIG1YQi3Zfd//8F1IAG1IAG1IAG1YEF1IEG1YIF1YIG1YIH14MN2YkG
04EF1IEG1IAF1IEF1YAG1YEG14QH1IEF1YIH1YEI1oMF14MJ2IQG1IAH1oML2YsX6IsG1IEG04EG
1IAG1IAJ04QF04BshD7zAAAALnRSTlMA+PLtBPzczseEPyoHAenk16mSdmNVJRLTwJyYjH8yalxM
Oi4aokYXC7a0sYgdoN3RYQAAAWlJREFUWMPt08lygkAUheHTgEyC4AA4xWg00Uzn/R8vlSxuATYJ
XDdZ+G2p+qGpPri7u/YUrTIzmoTbOEXTcT4Nl8F79OKhk7fIKfxFWn+ylAfu9gS7OGdDcJTvWrLO
RAksHthm9vgxH7ElH6Mt3dBiDsBb85rzZHm/vZCuaePs0BCzQxHRLqtQ4/nsYNjlGTULKtQPEVBh
CjGmhqkkMKfKXgJTqqwlsKRKKAGXKhMJGKoYCYyoMpKAQxVHAj5VfAmsqPImgQ1VIuWWxMutW7hA
ZMo1ihkVDrhtz0GKmmcOFqPuNHhPGzQVHCa/QGguk1OiLQmH7PCAa5XP3h5hU07Y0wPsxi572aLL
rldhhm7HHqf4wG/GmfL84jNX/P+GKmQ3U+BvyZRd3Bh9pBHt/BI97Q0tVhV622W8svYwwHnVns8j
hvG2rJvEGKxwKMITFMpAbn8ClWTGb04BtYNLBiVucH6dJbj7974A+OJcsCPT4PgAAAAASUVORK5C
YII=`
};

let getImage = (() => {
    var cache = {};
    return function(url) {
        if (cache[url]) {
            if (cache[url] instanceof Image) {
                return Promise.resolve(cache[url]);
            } else {
                // promise
                return cache[url];
            }
        } else {
            return cache[url] = new Promise(function(resolve, reject) {
                let img = new Image();
                img.onload = function() {
                    cache[url] = img;
                    resolve(img);
                };
                img.onerror = function() {
                    cache[url] = null;
                    resolve(null);
                };
                img.src = url;
            });
        }
    };
})();

function Ball (radius, src) {
    if (radius === undefined) { radius = 64; }
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.rotation = 0;
    this.scaleX = 0;
    this.scaleY = 0;
    this.image = null;
    this.globalAlpha = 1;
    getImage(src || urlMap['default'])
        .then((img) => {
            this.image = img;
        });
}

Ball.prototype.draw = function (context) {
    if (this.image) {
        context.save();
        context.translate(this.x + this.radius / 4, this.y + this.radius / 2);
        context.rotate(this.rotation);
        context.scale(this.scaleX, this.scaleY);
        context.globalAlpha = this.globalAlpha;
        context.drawImage(this.image, -this.radius / 4, -this.radius / 2, this.radius, this.radius);
        context.translate(-this.x - (this.radius / 4), -this.y - (this.radius / 2));
        context.restore();
    }    
};

module.exports = Ball;

