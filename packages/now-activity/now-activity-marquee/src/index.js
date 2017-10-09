import '../assets/index.scss'
import React from 'react';
import ReactDOM from 'react-dom';

const FPS = 20;
const STEP = 1;
const TIMEOUT = 1 / FPS * 1000;

export default class Marquee extends React.Component {

    static defaultProps = {
        text: '',
        autoPlay: true,
        loop: false,
        leading: 0,
        trailing: 0
    };

    state = {
        animatedWidth: 0,
        overflowWidth: 0
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this._measureText();

        if (this.props.autoPlay) {
            this._startAnimation();
        }
    }

    componentDidUpdate() {
        this._measureText();

        if (this.props.autoPlay) {
            this._startAnimation();
        }
    }

    componentWillUnmount() {
        clearTimeout(this._marqueeTimer);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.text.length != nextProps.text.length)
        {
            clearTimeout(this._marqueeTimer);
            this.setState({
                animatedWidth: 0
            });
        }
    }

    handleMouseEnter() {
        if (this.props.autoPlay) {
            clearTimeout(this._marqueeTimer);
        }
        else if (this.state.overflowWidth > 0){
            this._startAnimation();
        }
    }

    handleMouseLeave() {
        if (this.props.autoPlay && this.state.overflowWidth > 0) {
            this._startAnimation();
        }
        else {
            clearTimeout(this._marqueeTimer);
            this.setState({
                animatedWidth: 0
            });
        }
    }

    _startAnimation() {
        clearTimeout(this._marqueeTimer);
        const isLeading = this.state.animatedWidth === 0;
        const timeout = isLeading ? this.props.leading : TIMEOUT;

        const animate = () => {
            const {overflowWidth} = this.state;
            let animatedWidth = this.state.animatedWidth + STEP;
            const isRoundOver = animatedWidth > overflowWidth;

            if (isRoundOver) {
                if (this.props.loop) {
                    animatedWidth = 0;
                }
                else {
                    return;
                }
            }

            if (isRoundOver && this.props.trailing) {
                this._marqueeTimer = setTimeout(() => {
                    this.setState({
                        animatedWidth
                    });

                    this._marqueeTimer = setTimeout(animate, TIMEOUT);
                }, this.props.trailing);
            }
            else {
                this.setState({
                    animatedWidth
                });

                this._marqueeTimer = setTimeout(animate, TIMEOUT);
            }
        };

        this._marqueeTimer = setTimeout(animate, timeout);
    }

    _measureText() {
        const container = ReactDOM.findDOMNode(this);
        const node = ReactDOM.findDOMNode(this.refs.text);

        if (container && node) {
            const containerWidth = container.offsetWidth;
            const textWidth = node.offsetWidth;
            const overflowWidth = textWidth - containerWidth;

            if (overflowWidth !== this.state.overflowWidth) {
                this.setState({
                    overflowWidth
                });
            }
        }
    }

    render() {
        const style = {
            'position': 'relative',
            'right': this.state.animatedWidth,
            'whiteSpace': 'nowrap'
        };

        if (this.state.overflowWidth < 0) {
            return (
                <div className={`ui-marquee ${this.props.className}`} style={{overflow: 'hidden'}}>
                    <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
                </div>
            );
        }
        else {
            return (
                <div className={`ui-marquee ${this.props.className}`} style={{overflow: 'hidden'}}
                     onMouseEnter={this.handleMouseEnter.bind(this)}
                     onMouseLeave={this.handleMouseLeave.bind(this)}>
                    <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
                </div>
            );
        }
    }
}
