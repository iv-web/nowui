import React, { Component } from 'react';
import classnames from 'classnames';
import eventname from 'eventname';
import './index.scss';

const NEXT = 'NEXT';
const PREV = 'PREV';
const RESET = 'RESET';
// const defaultBanner = __inline('../images/defaultBanner.png');

/** 无限滚动版banner */
export default class Banner extends Component {

    static defaultProps = {
        autoChange: true,
        ratio: 0.4,
        rate: 5000
    } 

    constructor() {
        super();

        this.visableItemCount = 3; // 显示的个数
        this.timer = null; // 定时器
        this.horizontalPosition = 0; // 滚动轴水平位置距离
        this.paddingCount = (this.visableItemCount - 1) / 2; // 需要填充的items数量，在循环滚动时需要用;

        this.state = {
            currentIndex: 0 // 当前显示的面板
        };
    }

    onTouchStart = (e) => {
        if (!this.touchEventReady) {
            return;
        }
        this.stop();

        const touch = e.changedTouches ? e.changedTouches[e.changedTouches.length - 1] : e;

        /** 重置速度参数 */
        this.isMoving = true;
        this.moveCount = 0;
        this.velocity = 0;

        this.startTime = new Date();
        this.startX = touch.pageX;

        this.nowX = this.startX;
        this.nowTime = this.startTime;
    }

    onTouchMove = (e) => {
        e.preventDefault(); //统一禁止默认事件，防止事件响应失败

        if (!this.isMoving) {
            return;
        }

        const touch = e.changedTouches ? e.changedTouches[e.changedTouches.length - 1] : e;
        
        const move = touch.pageX - this.nowX;
        const nowTime = new Date();

        this.horizontalPosition -= move; // 计算移动距离
        this.velocity = move / (nowTime - this.startTime); // 计算移动速度

        this.nowX = touch.pageX;
        this.nowTime = nowTime;

        this.moveCount ++;

        this.domScroller.classList.add('noanimation');

        this.setScrollerTransform(this.horizontalPosition);

        // touch end 保护
        this.touchEndTimer = setTimeout(() => {
            this.onTouchEnd(e);
        }, 300);
    }

    onTouchEnd = (e) => {
        clearTimeout(this.touchEndTimer);
        if (!this.isMoving || this.moveCount === 0) {
            return;
        }

        this.isMoving = false;
        this.domScroller.classList.remove('noanimation');

        const touch = e.changedTouches ? e.changedTouches[e.changedTouches.length - 1] : e;

        const endX = touch.pageX;

        const totalMove = endX - this.startX;

        /**  超过屏幕一半距离， 或者移动速度大于0.1  则产生 banner 位移**/
        if (Math.abs(totalMove) >= document.body.offsetWidth / 2
            || Math.abs(this.velocity) >= 0.1) {
            if (totalMove > 0) {  // 向左滑
                this.prev();
            } else if (totalMove < 0) {  // 向右滑
                this.next();
            }
        } else {
            this.reset();
        }

        // 判断是否要滚到下个面板
        // this.play();
    }

    /**
        滚动动画结束监听
     */
    onScrollEnd = (e) => {
        let newIndex = 0;

        this.domScroller.classList.add('noanimation');
        this.horizontalPosition = 0;
        this.setScrollerTransform(this.horizontalPosition);
        switch (this.scrollerState) {
            case NEXT:
                newIndex = this.state.currentIndex + 1;

                if (newIndex >= this.props.items.length) {
                    newIndex = 0;
                }

                this.setState({
                    currentIndex: newIndex,
                });
                break;

            case PREV:
                newIndex = this.state.currentIndex - 1;
                
                if (newIndex < 0) {
                    newIndex = this.props.items.length - 1;
                }

                this.setState({
                    currentIndex: newIndex,
                });
                break;

            case RESET:
            default:
                this.forceUpdate();
                // this.horizontalPosition = 0;
                // this.setScrollerTransform(this.horizontalPosition);
                break;
        }
    }

    /** 只保留三个views来显示 */
    getVisableItems = () => {
        const { items } = this.props;
        const { currentIndex } = this.state;

        if (items.length <= this.paddingCount) {
            return items;
        }

        const tempItems = items
            .slice(-this.paddingCount)
            .concat(items)
            .concat(items.slice(0, this.paddingCount)); // 向前填充 向后填充

        return tempItems.splice(currentIndex, this.visableItemCount);
    }
    
    /**
     * 设置滚动轴的值
     * @param  {[type]} x [description]
     * @return {[type]}   [description]
     */
    setScrollerTransform = (x = this.horizontalPosition) => {
        const transformValue = `translate3d(${-x}px, 0, 0)`;
        const webkitTransformValue = `-webkit-translate3d(${-x}px, 0, 0)`;

        if(!this.domScroller) {
            return;
        }
        
        this.domScroller.style.transform = transformValue;
        this.domScroller.style.webkitTransformValue = webkitTransformValue;
    }

    /* 设置 dom的 位置属性 */
    setBannerItemPositionStyle = () => {
        // for (let i = 0; i < this.visableItemCount && i < this.props.items.length; i += 1) {
        //     const visableItem = this[`domVisableItem${i}`];
        //     visableItem.style.left = `${(i - this.paddingCount) * 100}%`;
        // }
        if(!this.domScroller) {
            return;
        }
        
        this.domScroller.classList.add('noanimation'); // 可能还在执行动画，在下个事件队列取消
        this.setScrollerTransform(); // 重置 滚动容器的  transform 值

        setTimeout(() => {
            this.domScroller && this.domScroller.classList.remove('noanimation'); //可能组件已经被卸载了
        }, 0);
    }

    /** 根据 props 设置 state */
    setCurrentIndex = (top = 0) => {
        this.state.currentIndex = top;
    }

    setTimer = () => {
        if (this.timer && this.props.items.length <= 1) {
            return;
        }

        this.timer = setInterval(this.next, this.props.rate);
    }

    componentWillMount() {
        this.setCurrentIndex(this.props.top);
    }

    componentDidMount() {
        this.mounted = true;

        this.domScroller.addEventListener(eventname.touchstart, this.onTouchStart);
        this.domScroller.addEventListener(eventname.touchmove, this.onTouchMove);
        this.domScroller.addEventListener(eventname.touchend, this.onTouchEnd);
        this.domScroller.addEventListener(eventname.transitionEnd, this.onScrollEnd);
        
        this.resetParams();
        this.setBannerItemPositionStyle();

        // 自动滚动;
        this.play();
        // ** 添加动画监听
        // this.domScroller.addEventListener(eventname.transitionEnd, this.onScrollEnd);
    }

    componentWillUnmount() {
        this.domScroller.removeEventListener(eventname.touchstart, this.onTouchStart);
        this.domScroller.removeEventListener(eventname.touchmove, this.onTouchMove);
        this.domScroller.removeEventListener(eventname.touchend, this.onTouchEnd);
        this.domScroller.removeEventListener(eventname.transitionEnd, this.onScrollEnd);
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.items.length === this.props.items.length && nextProps.top === this.props.top) {
            return;
        }

        this.setCurrentIndex(nextProps.top);
    }

    /* 更新完成后 */
    componentDidUpdate() {
        // this.domScroller.addEventListener(eventname.transitionEnd, this.onScrollEnd); //重新绑定事件
        this.stop();
        this.resetParams();
        this.setBannerItemPositionStyle();
        this.play();
    }

    componentWillUnMount() {
        this.domScroller.removeEventListener(eventname.transitionEnd, this.onScrollEnd);
    }

    /* 点击banner */
    onClickBanner = (item) => {
        this.props.onClickBanner && this.props.onClickBanner(item);
    }

    stop = () => {
        clearInterval(this.timer);
        delete this.timer;
    }

    play = () => {
        if(this.props.items.length > 1) {
            this.setTimer();
        }
    }

    reset = () => {
        this.touchEventReady = false;
        this.setScrollerTransform(0);
        this.scrollerState = RESET;
    }

    next = () => {
        this.touchEventReady = false;
        this.setScrollerTransform(document.body.offsetWidth);
        this.scrollerState = NEXT;
    }

    prev = () => {
        this.touchEventReady = false;
        this.setScrollerTransform(-document.body.offsetWidth);
        this.scrollerState = PREV;
    }

    /* 重置一些参数 */
    resetParams = () => {
        this.horizontalPosition = 0;// 重置水平距离
        this.touchEventReady = this.props.items.length > 1;// 重新启用手势监听
    }

    // getScrollerStyle = () => {
    //     this.horizontalPosition = this.state.currentIndex * document.body.offsetWidth;
      
    //     const transformValue = `translate3d(${-this.horizontalPosition}px, 0, 0)`;
    //     const webkitTransformValue =  `-webkit-translate3d(${-this.horizontalPosition}px, 0, 0)`;

    //     return {
    //         transform: transformValue,
    //         WebkitTransform: webkitTransformValue
    //     };
    // }

    onBannerLoadError = (src, component) => {
        if(this.props.onBannerLoadError) {
            this.props.onBannerLoadError(src);
        }
    }

    render() {
        const { items, ratio } = this.props;
        const { currentIndex } = this.state;

        // const scrollerStyle = this.getScrollerStyle();
        const visableItems = this.getVisableItems();

        if(visableItems.length === 0) {
            return null;
        }

        const areaStyle = {
            paddingTop: ratio * 100 + '%'
        };

        return (
            <div className="nd-banner-area" style={areaStyle} key={items.length}>
                <div
                    ref={(c) => { this.domScroller = c; }}
                    className="nd-banner-scroller"
                >
                    {
                        visableItems.map((item, index) => {
                            const bannerStyle = {
                                // backgroundImage: `url(${item.picUrl})`,
                                left: visableItems.length !== 1 ? `${(index - this.paddingCount) * 100}%` : 0
                            };

                            return (
                                <img
                                    ref={(c) => { this[`domVisableItem${index}`] = c; }}
                                    key={item.picUrl + index}
                                    className="nd-banner-item"
                                    onClick={() => {
                                        this.onClickBanner(item);
                                    }}
                                    src={item.picUrl}
                                    style={bannerStyle}
                                    onError={this.onBannerLoadError}
                                />
                            );
                        })
                    }
                </div>
                <div className="nd-banner-indicatorwrap">
                    {
                        items.map((item, index) => {
                            const indicatorClass = classnames({
                                select: currentIndex === index,
                                'nd-banner-indicator': true,
                            });
                            return (
                                <i key={index} className={indicatorClass} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
