import React, { Component } from 'react';
import classnames from 'classnames';
import eventname from 'eventname';
import './index.scss';

const NEXT = 'NEXT';
const PREV = 'PREV';
const RESET = 'RESET';

export class ScrollerItem extends Component {
    defaultProps = {
        group: 'DEFAULT'
    }

    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div> 
        )
    }
}

/** Scroller */
export default class Scroller extends Component {
    defaultProps = {
        showIndicator: false
    }

    constructor() {
        super();

        this.timer = null; // 定时器
        this.horizontalPosition = 0; // 滚动轴水平位置距离
        this.indicatorCanMoveLeft = false; // 指示符可以左移动
        this.indicatorCanMoveRight = false; // 指示符可以右移动
        this.state = {
            currentGroup: 0,
            currentIndex: 0, // 当前显示的面板
            speed: 5000, // 3秒切换
        };
    }

    componentWillMount() {
        if(this.props.index) {
            this.state.index = this.props.index;
        }
    
        this.setGroupList(this.props.children);
        this.setCurrentGroup(this.props.index);
        this.setViewsCount();
    }

    componentDidMount() {
        this.mounted = true;

        this.resetParams();

        // ** 添加动画监听
        this.domScroller.addEventListener(eventname.transitionEnd, this.onScrollEnd);

        // 必须监听原生的dom touch 事件， 因为e.preventDefault() 必须在原生事件里面调用
        this.domScroller.addEventListener(eventname.touchstart, this.onTouchStart);
        this.domScroller.addEventListener(eventname.touchmove, this.onTouchMove);
        this.domScroller.addEventListener(eventname.touchend, this.onTouchEnd);
    }

    componentWillReceiveProps(nextProps) {
        this.setGroupList(nextProps.children);

        if(nextProps.children.length === this.viewsCount && nextProps.index === this.props.index) {
            return;
        }

        this.setCurrentIndex(nextProps.index);
        this.setViewsCount();
    }

    componentWillUnMount() {
        this.domScroller.removeEventListener(eventname.transitionEnd, this.onScrollEnd);
    }

    onTouchStart = (e) => {
        if(!this.touchEventReady) {
            return;
        }
        e.preventDefault(); //统一禁止默认事件，防止事件响应失败

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
        clearTimeout(this.touchEndTimer);
        e.preventDefault(); //统一禁止默认事件，防止事件响应失败

        if(!this.isMoving) {
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
        this.domIndicatorScoller && this.domIndicatorScoller.classList.add('noanimation');
        this.setScrollerTransform(this.horizontalPosition);

        if((this.indicatorCanMoveLeft && this.horizontalPosition <= 0) 
            || (this.indicatorCanMoveRight && this.horizontalPosition >= 0)) {

            if(!this.domIndicatorScoller) {
                return ;
            }

            this.setScrollerTransform(this.horizontalPosition, this.domIndicatorScoller);
        }

        // touch end 保护
        this.touchEndTimer = setTimeout(() => {
            this.onTouchEnd(e);
        }, 300);
    }

    onTouchEnd = (e) => {
        clearTimeout(this.touchEndTimer);
        if (!this.isMoving) {
            this.resetParams();
            return;
        }

        this.isMoving = false;
        this.domScroller && this.domScroller.classList.remove('noanimation');
        this.domIndicatorScoller && this.domIndicatorScoller.classList.remove('noanimation');

        const touch = e.changedTouches ? e.changedTouches[e.changedTouches.length - 1] : e;

        const endX = touch.pageX;

        const totalMove = endX - this.startX;
        /**  超过容器一半距离， 或者移动速度大于0.1  则产生 banner 位移**/
        if (Math.abs(totalMove) >= this.domScroller.offsetWidth / 2
            || Math.abs(this.velocity) >= 0.1) {
            if (totalMove > 0) {  // 向左滑
                if(!this.props.loop && this.state.currentIndex === 0) {
                    this.reset();
                } else {
                    this.prev();
                }
            } else if (totalMove < 0) {  // 向右滑
                if(!this.props.loop && this.state.currentIndex === this.viewsCount - 1) {
                    this.reset();
                } else {
                    this.next();                    
                }
            }
        } else {
            this.reset();
        }
    }

    /**
        滚动动画结束监听
     */
    onScrollEnd = (e) => {
        let newIndex = 0;
        this.domScroller.classList.add('noanimation');
        this.domIndicatorScoller && this.domIndicatorScoller.classList.add('noanimation');
        this.horizontalPosition = 0;
        this.setScrollerTransform(this.horizontalPosition);
        this.setScrollerTransform(this.horizontalPosition, this.domIndicatorScoller);
        this.resetParams();
        switch (this.scrollerState) {
            case NEXT:
                newIndex = this.state.currentIndex + 1;

                if (newIndex >= this.viewsCount) {
                    newIndex = 0;
                }

                this.setCurrentIndex(newIndex);
                break;

            case PREV:
                newIndex = this.state.currentIndex - 1;
                
                if (newIndex < 0) {
                    newIndex = this.viewsCount - 1;
                }

                this.setCurrentIndex(newIndex);
                break;

            case RESET:
            default:
                this.forceUpdate();
                // this.horizontalPosition = 0;
                // this.setScrollerTransform(this.horizontalPosition);
                break;
        }
    }
    
    /**
     * 设置滚动轴的值
     * @param  {[type]} x [description]
     * @return {[type]}   [description]
     */
    setScrollerTransform = (x = this.horizontalPosition, dom = this.domScroller) => {
        const transformValue = `translate3d(${-x}px, 0, 0)`;
        if(!dom) {
            return;
        }
        
        dom.style.transform = transformValue;
        dom.style.webkitTransform = transformValue;
    }

    /** 根据 props 设置 state */
    setCurrentIndex = (newIndex = 0) => {
        const {
            currentIndex,
            currentGroup,
        } = this.state;

        if(newIndex !== this.state.currentIndex) {
            this.setState({
                currentIndex: newIndex
            });

            this.setCurrentGroup(newIndex);

            this.props.onIndexChange && this.props.onIndexChange(newIndex, currentIndex);
        }
    }

    /** 设置当前的 Group */

    setCurrentGroup = (newIndex = 0) => {
        const {
            currentIndex,
            currentGroup,
        } = this.state;

        let newCurrentGroup = null;

        this.indicatorCanMoveLeft = false;
        this.indicatorCanMoveRight = false;

        let hasNewGroupIndex = this.groupList.some((group, groupIndex) => {
            return group.some((view, indexInGroup) => {
                if(view.index === newIndex) {
                    newCurrentGroup = groupIndex;

                    if(indexInGroup === 0) {
                        this.indicatorCanMoveLeft = true; // 可以右移
                    }

                    if(indexInGroup === group.length - 1) {
                        this.indicatorCanMoveRight = true; // 可以左移
                    }

                    return true;
                }
            });
        });

        if(hasNewGroupIndex) {
            this.setState({
                currentGroup: newCurrentGroup
            });
        }
    }

    setTimer = () => {
        if (this.timer && this.viewsCount <= 1) {
            return;
        }

        this.timer = setInterval(this.next, this.state.speed);
    }

    setViewsCount = () => {
        if(this.props.children) {
            this.viewsCount = this.props.children.length;
        }
    }

    setGroupList = (views) => {
        this.groupList = this.getGroupList(views);
    }

    getGroupList = (views) => {
        const gorupMap = {}; // 记录在 groupArray 中的 index
        const groupArray = [];

        views.forEach((view, index) => {
            const viewGroup = view.props.group;
            const groupArrayIndex = gorupMap[viewGroup];
            if(typeof groupArrayIndex !== 'number') {
                const group = [{
                    view,
                    index
                }];

                groupArray.push(group);

                gorupMap[viewGroup] = groupArray.length - 1;
            } else {
                const group = groupArray[groupArrayIndex];

                group.push({
                    view,
                    index
                });
            }
        });

        return groupArray;
    }

    reset = () => {
        this.touchEventReady = false;
        this.setScrollerTransform(0);
        this.setScrollerTransform(0, this.domIndicatorScoller);
        this.scrollerState = RESET;
    }

    // 通过 transition 实现弹性滑动
    next = () => {
        this.touchEventReady = false;
        this.setScrollerTransform(this.domScroller.offsetWidth);
        if(this.indicatorCanMoveRight) {
            this.setScrollerTransform(this.domScroller.offsetWidth, this.domIndicatorScoller);
        }
        this.scrollerState = NEXT;
    }

    prev = () => {
        this.touchEventReady = false;
        this.setScrollerTransform(-this.domScroller.offsetWidth);
        if(this.indicatorCanMoveLeft) {
            this.setScrollerTransform(-this.domScroller.offsetWidth, this.domIndicatorScoller);
        }
        this.scrollerState = PREV;
    }

    /* 重置一些参数 */
    resetParams = () => {
        this.horizontalPosition = 0;// 重置水平距离
        this.touchEventReady = this.viewsCount > 1;// 重新启用手势监听
    }

    renderView = (view, index) => {
        const { currentIndex } = this.state;

        const style = {
            position: 'absolute',
            left: `${(index - currentIndex) * 100}%`,
            width: document.body.offsetWidth,
            height: '100%',
            display: (index >= currentIndex - 1 && index <= currentIndex + 1) ? '' : 'none'
        };

        const className = view.props.className + ' nd-scroll-view';

        return React.cloneElement(
            view,
            { 
                className,
                style,
                key: index
            }
        )
    }

    renderGroupList = (groupList = []) => {
        return this.props.children.map((view, index) => {
            return this.renderView(view, index);
        });
    }

    renderIndicator(groupList) {
        const { 
            currentGroup,
            currentIndex
        } = this.state;

        return groupList.map((groupItems, index) => {
            const style = {
                left: `${(index - currentGroup) * 100}%`,
                display: (index >= currentGroup - 1 && index <= currentGroup + 1) ? '' : 'none'
            };

            return groupItems.length > 1 ? (
                <div className="nd-indicator-group" key={index} style={style}>
                    <div className="nd-indicatorwrap">
                        {
                            groupItems.map((groupItem, index) => {
                                const indicatorClass = classnames({
                                    select: currentIndex === groupItem.index,
                                    'nd-indicator': true,
                                });
                                return (
                                    <i key={index} className={indicatorClass} key={index} />
                                );
                            })
                        }
                    </div>
                </div>
            ) : null
        })
    }

    render() {
        const {
            className = '',
            style = {}
        } = this.props;
        
        return (
            <div
                className={className}
                style={Object.assign({}, style, {
                    position: 'relative'
                })}
            >
                <div
                    ref={(c) => { this.domScroller = c; }}
                    className="nd-scroller"
                >
                    { this.renderGroupList(this.groupList)}
                </div>
                {
                    this.props.showIndicator ? (
                        <div
                            className="nd-indicator-scoller"
                            ref={(c) => { this.domIndicatorScoller = c; }}
                        >
                            { this.renderIndicator(this.groupList) }
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
