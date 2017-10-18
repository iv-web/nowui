import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Ball from './lib/ball';
import BubbleWithMotionPath from './lib/bubble_with_motionpath';
import eventname from 'eventname'
import '../assets/index.scss';

export default class Bubbles extends Component {
    constructor() {
        super();
        const { props } = this;
        this.MAX_LENGTH = 60;

        // bubble绘制队列
        this.bpList = [];
        this.drawFrame = this.drawFrame.bind(this);
        this.startPointScale = {
            x: 0.5,
            y: 0.9
        };
        this.START_POINT = {
            x: this.startPointScale.x * 240,
            y: this.startPointScale.y * 600
        };
        this.playing = false;
        this.time = new Date().getTime();
        this.bubbleRadius = 64;
        this.addBubbleInterval = 100;
    }

    static defaultProps = {
        loveMessage: {
            bubbles: [],
            seq: new Date().getTime()
        }
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.bubbleMessage.seq !== this.props.bubbleMessage.seq) {
            let bubbles = nextProps.bubbleMessage.bubbles;
            let time = 0 ;
            for (let i = 0, firstLength = bubbles.length; i < firstLength; i++) {
                if(bubbles[i] && bubbles[i].bubbleNum) {
                    for (let j = 0, secondLength = bubbles[i].bubbleNum; j < secondLength; j++) {

                        if (this.bpList.length < this.MAX_LENGTH) {
                            setTimeout(() => {
                                this.addToBpList(this.createBp(bubbles[i].bubbleImageSrc));
                            }, time);
                            time += this.addBubbleInterval
                        }
                    }
                }
            }
        }
    }

    shouldComponentUpdate () {
        return false; //永不更新
    }

    componentWillMount () {
        const { props } = this;
        
        // bubble绘制队列的最大长度
        this.MAX_LENGTH = props.maxBubbleMessageLength;

        this.START_POINT = {
            x: this.startPointScale.x * props.canvasWidth,
            y: this.startPointScale.y * props.canvasHeight
        };

        // bubble直径
        this.bubbleRadius = props.bubbleRadius;
        // 每个bubble绘制之间的间隔，单位ms
        this.addBubbleInterval = props.showBubbleInterval;
    }

    componentDidMount () {
        
    }

    drawFrame(cv) {
        this.playing = true;
        let canvas = this.refs.bubbleCanvas;
        let context = canvas && canvas.getContext('2d');
        let bpList = this.bpList;

        if (typeof context !== 'undefined') {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < bpList.length; i++) {
                if (bpList[i].bubble.globalAlpha < 0.1) {
                    bpList.splice(i, 1);
                    i--;
                } else {
                    bpList[i].draw(context);
                }
            }
            let t = new Date().getTime();

            this.time = t;
            if (this.bpList.length > 0) {
                window.requestAnimationFrame(this.drawFrame, canvas); //Chrome增加了第二个可选的参数，即将要发生变化的DOM元素。知道了重绘将发生在页面中哪个特定元素的区域内，就可以将重绘限定在该区域中。
            } else {
                this.playing = false;
            }
        }
    }

    createBp(bubbleImageSrc) {
        let opt = {
            startPointScale: this.startPointScale
        };

        return new BubbleWithMotionPath(new Ball(this.bubbleRadius, bubbleImageSrc), this.START_POINT, this.refs.bubbleCanvas, opt);
    }

    _noop = () => {}

    addToBpList(bubbles) {
        this.bpList.push(bubbles);
        if (!this.playing) {
            this.drawFrame();
        }
    }

    play(bubbleImageSrc) {
        let newBp = null;
        newBp = this.createBp(bubbleImageSrc);
        this.addToBpList(newBp)
    }

    render() {
        const { props } = this;
        let canvasStyle = {
            bottom: props.canvasBottom || 50,
            right: props.canvasRight || 0,
            width: props.canvasWidth ? props.canvasWidth / 2 : 240,
            height: props.canvasHeight ? props.canvasHeight / 2 : 600
        }
        return (
            <canvas 
                style={canvasStyle}
                className="bubbles"
                width={props.canvasWidth || 240}
                height={props.canvasHeight || 600}
                ref="bubbleCanvas">
            </canvas>
        )
    }
}
