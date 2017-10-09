var eventname = {
    'transitionEnd': 'onwebkittransitionend' in window ? 'webkitTransitionEnd' : 'transitionEnd',
    'animationEnd': 'onwebkitanimationend' in window ? 'webkitAnimationEnd' : 'animationEnd',
    'touchstart': 'ontouchstart' in window ? 'touchstart' : 'mousedown',
    'touchmove': 'ontouchmove' in window ? 'touchmove' : 'mousemove',
    'touchend': 'ontouchend' in window ? 'touchend' : 'mouseup',
    'touchcancel': 'touchcancel',
    'raf': window.requestAnimationFrame || window.webkitRequestAnimationFrame || function raf(fn) { return setTimeout(fn, 60); }
};

module.exports = eventname;