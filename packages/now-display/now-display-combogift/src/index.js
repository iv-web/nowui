import '../assets/index.css'
import React, { Component } from 'react'
import classnames from 'classnames'
import { defaultAvatar, defaultGift } from 'now-img'
import ImageLoader from 'now-base-image'
import CSSTransitionGroup from 'react-addons-css-transition-group';

function countToArray(count) {
    let nums = []
    while (count > 0) {
        nums.unshift(count % 10)
        count = Math.floor(count / 10)
    }
    return nums
}

const GIFT_BORDER_COLORS = {
    1: 'rgb(255,202,0)',
    2: 'rgb(225,103,250)'
}

/* 记录被占用的位置 */
const CHANNEL_MAP = {

}

/*  
    废弃 key 方案， 创建，销毁dom ，太消耗性能。
*/
class GiftCount extends Component {
    state = {
        animation: true,
        count: 0
    }

    countList = []

    componentWillMount() {
        this.state.count = this.props.count;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.count !== this.props.count) {
            this.countList.push(nextProps.count);
            this.play();
        }
    }

    play = () => {
        if(this.countList.length <= 0 || this.state.animation) { //正在播放中退出
            return
        }

        this.animationEndProtectTimer = setTimeout(this.animationEndProtectTimer, 300)
        
        const count = this.countList.splice(0, 1)

        this.setState({
            animation: true,
            count,  // 从数组中拿到待播放的
        })
    }

    onAnimationEnd = (e) => {
        clearTimeout(this.animationEndProtectTimer)

        this.setState({
            animation: false
        })

        setTimeout(this.play, 0);
    }

    render() {
        const {
            count 
        } = this.state

        let nums = countToArray(count)

        let countClass = classnames({
            'giftcount': true,
            'numcolor-yellow': count < 10,
            'numcolor-orange': count >= 10 && count <= 66,
            'numcolor-red': count > 66 && count < 100,
            'numcolor-purple': count >= 100,
            'count-enter': this.state.animation
        })

        return (
            <div className={countClass} onAnimationEnd={this.onAnimationEnd}>
                <i className="icon-x"></i>
                {
                    nums.map((num, index) => {
                        return (
                            <span key={index} className={`icon-num num${num}`}></span>
                        )
                    })
                }
            </div>
        )
    }
}


class ThrowGift extends Component {
    componentWillMount() {
        this.createKeyFrames();
    }

    createKeyFrames = () => {
        const {
            x,
            y,
            width,
            height,
            getTargetPos
        }  = this.props
        // 动态创建一个 keyframes

        if(!x || !y) {
            return;
        }

        const {
            targetX,
            targetY
        } = getTargetPos();

        this.xFrameName = `x${x}y${targetX}`.replace(/\./ig,'')
        this.yFrameName = `y${y}y${targetY}`.replace(/\./ig,'')
        this.styleId = `x${x}y${y}tx${targetX}ty${targetY}`.replace(/\./ig,'')
        if(!document.querySelector(`#${this.styleId}`) && x && y && targetX && targetY && width && height) { // 保证只创建一次
            const style = document.createElement("style");  
            style.id = this.styleId;
            style.appendChild(document.createTextNode('')); 
            document.head.appendChild(style);
            const sheet = style.sheet;
            if('onwebkitanimationend' in window) {
                sheet.insertRule(`@-webkit-keyframes ${this.xFrameName}{0%{-webkit-transform: translate3d(${x}px,0,0) scale(1)}100%{-webkit-transform:translate3d(${targetX - width/2}px,0,0) scale(0)}}`, 0);
                sheet.insertRule(`@-webkit-keyframes ${this.yFrameName}{0%{-webkit-transform: translate3d(0,${y}px,0)}50%{-webkit-transform:translate3d(0,${targetY-40-height/2}px,0)}100%{-webkit-transform:translate3d(0,${targetY-height/2}px,0)}}`, 1);
            } else {
                sheet.insertRule(`@keyframes ${this.xFrameName}{0%{transform: translate3d(${x}px,0,0) scale(1)}100%{transform:translate3d(${targetX - width/2}px,0,0) scale(0)}}`, 0);
                sheet.insertRule(`@keyframes ${this.yFrameName}{0%{transform: translate3d(0,${y}px,0)}50%{transform:translate3d(0,${targetY-40-height/2}px,0)}100%{transform:translate3d(0,${targetY-height/2}px,0)}}`, 1);
            }   
        }
    }

    static create(opts) {
        const dom = document.createElement("div");
        document.body.appendChild(dom);
        ReactDOM.render(<ThrowGift {...opts}/>, dom);

        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(dom);
            document.body.removeChild(dom);
        }, 600)
    }

    render() {
        const {
            x,
            y,
            width,
            src,
            height
        }  = this.props

        if(!x || !y) {
            return null;
        }

        const xStyle = Object.assign({
            width: width,
            height: height,
            backgroundImage: `url(${src})`,
            animation: `${this.xFrameName} .6s both`,
            WebkitAnimation: `${this.xFrameName} .6s both`
        })

        const yStyle = {
            animation: `${this.yFrameName} .6s both`,
            WebkitAnimation: `${this.yFrameName} .6s both`
        }

        return (
            <div className="gift-throwgift-y" style={yStyle} onAnimationEnd={this.remove}>
                <div style={xStyle} className="gift-throwgift-x" ref={(c)=>{this.throwImage = c}}></div>            
            </div>
        )
    }
}

// 需要根据图片大小动态计算样式
class ComboGiftImage extends Component {
    state = {
        width: 40,
        height: 40,
        loaded: false
    }

    static imageCache = {}

    componentWillMount() {
        const style = ComboGiftImage.imageCache[this.props.src];
        if(style) {
            this.setState(Object.assign({
                loaded: true   
            }, style));

            ThrowGift.create(Object.assign({}, style, this.props));
        } else {
            const img = new Image();

            img.onload = () => {
                const style = {
                    width: img.naturalWidth / 2,
                    height: img.naturalHeight / 2
                }

                this.setState(Object.assign({
                    loaded: true
                }, style));

                ComboGiftImage.imageCache[this.props.src] = style;

                ThrowGift.create(Object.assign({}, style, this.props));
            }

            img.src = this.props.src;
        }
    }

    render() {
        const {
            loaded,
            width,
            height
        } = this.state;

        const wrapperStyle = {
            marginTop: -height / 2,
            marginLeft: -width / 2
        }

        const photoStyle = {
            width,
            height,
            backgroundImage: `url(${loaded ? this.props.src : defaultGift})`,
        }

        return (
            <div className="gift-photo-wrapper" style={wrapperStyle}>
                <div className="gift-photo" style={photoStyle}></div>
                <GiftCount count={this.props.count} />
            </div>
        )
    }
}

class ComboGift extends Component {
    constructor(props) {
        super(props)

        const targetNum = this.props.comboCount || 1

        this.id = this.getId()

        this.state = {
            currentNum: this.getNumber(targetNum, 1),
            targetNum: targetNum,
            channel: this.getChannel(),
            targetX: null,
            targetY: null,
            mounted: false
        }
    }

    static id = 1

    componentWillReceiveProps(nextProps) {
        if (nextProps.comboCount > this.props.comboCount) {
            const newTargetNum = nextProps.comboCount || 1
            const newCurrentNum = this.getNumber(newTargetNum, this.state.currentNum)
            this.setState({
                currentNum: newCurrentNum,
                targetNum: newTargetNum
            })
            this.counter() //重置counter
        }
    }

    componentDidMount () {
        this.counter()
        this.setState({
            mounted: true
        });
    }

    componentWillUnmount () {
        clearInterval(this._interval)
        /* 防止意外卸载组件时，没有清空 chanel */
        
        if(CHANNEL_MAP[this.state.channel] === this.id) {
            delete CHANNEL_MAP[this.state.channel]
        }
    }

    getTargetPos = () => {
        const rect = this.refs.message.getBoundingClientRect()

        return {
            targetX: 146,
            targetY: rect.top
        }
    }

    getId = () => {
        return ComboGift.id ++
    }

    getChannel = () => {
        let channel = 0
        while(CHANNEL_MAP[channel]) {
            channel ++
        }

        CHANNEL_MAP[channel] = this.id

        return channel
    }

    getNumber = (target, current) => {
        let diff = Math.min(target - current, 3)
        return target - diff
    }

    counter () {
        clearInterval(this._interval) //重置 counter

        this._interval = setInterval(() => {
            let {
                currentNum,
                targetNum
            } = this.state

            currentNum ++ 
            if(currentNum > targetNum) {
                clearInterval(this._interval)
            } else {
                this.setState({
                    currentNum: currentNum
                })
            }
        }, 300)
    }

    render() {
        const {
            comboCount,
            userNick,
            userPic,
            pageX,
            pageY,
            gift
        } = this.props

        const {
            giftName,
            image,
            style
        } =  gift

        const borderColor = GIFT_BORDER_COLORS[style]

        return (
            <div ref="message" className='combogift-message' style={{
                bottom: this.state.channel * 60
            }}>
                <div className="detail-message-wrap" style={borderColor && {
                        border: '2px ' + borderColor + ' solid'
                    }}>
                    <ImageLoader 
                        className="user-photo" 
                        src={userPic}
                        placeholder={defaultAvatar}
                    />
                    <div className="detail">
                        <p>{userNick}</p>
                        <p>{'送一个' + gift.giftName}</p>
                    </div>
                    {
                        this.state.mounted ? (
                            <ComboGiftImage count={this.state.currentNum} src={gift} x={pageX} y={pageY} getTargetPos={this.getTargetPos} />
                        ) : null
                    }
                </div>

            </div> 
        ) 
    }
}

class ComboGiftAnimation extends Component {
    /* 检查哪些消息没了 把该消息占用的位置删除 */
    componentWillReceiveProps(nextProps) {
        const deleteMessages = [] 

        this.props.messages.forEach((message) => {
            let shouldDelete = true

            for(let i = 0; i < nextProps.messages.length; i++) {
                if(nextProps.messages[i].key === message.key) {
                    shouldDelete = false
                    break
                }
            }

            if (shouldDelete) {
                const channel = this.refs[message.key].state.channel
                delete CHANNEL_MAP[channel]
            }

        })
    }

    render () {
        return (
            <CSSTransitionGroup
                transitionName="combogift"
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {
                    this.props.messages.map((message, index) => {
                        return (
                            <ComboGift 
                                {...message}
                                ref={message.key}
                                key={message.key}
                            />
                        )
                    })
                }
            </CSSTransitionGroup>
        )
    }
}

export default ComboGiftAnimation