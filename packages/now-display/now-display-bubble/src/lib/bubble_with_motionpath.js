import MotionPath from './motionpath';

let directCount = 0;
let xAxisOffset = 120;
function BubbleWithMotionPath(bubble, startPoint, canvas = {}, opt = {}) {
    this.bubble = bubble;
    this.startPoint = startPoint;
    this.xPath = new MotionPath();
    this.yPath = new MotionPath();
    this.endPoint = {
        x: (Math.random() * 0.4 + 0.3) * canvas.width,
        y: 0.1 * canvas.height
    };
    directCount++;
    if(directCount % 2 === 0) {
        this.ctrlPt0 = {x: this.endPoint.x + xAxisOffset, y: 0.4 * canvas.height};
        this.ctrlPt1 = {x: this.endPoint.x - xAxisOffset, y: (opt.startPointScale.y - 0.01) * canvas.height};
    } else {
        this.ctrlPt0 = {x: this.endPoint.x - xAxisOffset, y: 0.4 * canvas.height};
        this.ctrlPt1 = {x: this.endPoint.x + xAxisOffset, y: (opt.startPointScale.y - 0.01) * canvas.height};
    }

    this.xPath.start = this.startPoint.x;
    this.xPath.bezierCurveTo(this.ctrlPt0.x, this.ctrlPt1.x, this.endPoint.x);
    this.yPath.start = this.startPoint.y;
    this.yPath.lineTo(this.endPoint.y);
    this.startTime = new Date().getTime();
    this.canvas = canvas;
    this.degree = 10;
    this.ratateCount = 0;
    this.scale = 3000; // scale++ -> time++ -> speed--
}

BubbleWithMotionPath.prototype.randomCtrlPointX = function() {
    let width = this.canvas.width;
    let x = (width / 3 * Math.random()).toFixed(0);
    if(Math.random() > 0.5){
        x = width - x;
    }
    return x;
};

/**
 * 角度转弧度
 * @param x
 */
function rads(x) {
    return Math.PI * x / 180;
}

BubbleWithMotionPath.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.bezierCurveTo(this.ctrlPt0.x, this.ctrlPt0.y, this.ctrlPt1.x, this.ctrlPt1.y, this.endPoint.x, this.endPoint.y);
    let now = new Date().getTime();
    let time = (now - this.startTime);

    if (time < 200) {
        this.bubble.scaleX = this.bubble.scaleY = time / 200
    } else {
        this.bubble.scaleX = this.bubble.scaleY = 1
    }


    if (time > this.scale) {
        time =  (time % this.scale) / this.scale
    } else {
        time = time / this.scale
    }
    this.bubble.x = this.xPath.interpolate(time);
    this.bubble.y = this.yPath.interpolate(time);
    this.bubble.globalAlpha = ((this.bubble.y - this.endPoint.y) / (0.5 * this.canvas.height)).toFixed(2);

    if(this.ratateCount % 30 < 15) {
        this.degree -= 1;
        this.bubble.rotation = rads(this.degree);
        this.ratateCount++;
    } else if(this.ratateCount % 30 >= 15) {
        this.degree += 1;
        this.bubble.rotation = rads(this.degree);
        this.ratateCount++;
    }

    this.bubble.draw(ctx);
};

export default BubbleWithMotionPath;