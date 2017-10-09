import React, { Component } from 'react';
import classnames from 'classnames';

const ENTERING = 1;
const HAS_ENTER = 2;
const LEAVEING = 3;
const HAS_LEAVE = 4;

// 通过 show 控制， react 组件的入场和出场动画， 通过设置 animation 来实现动画， 隐藏时，会设置为 display: none , 而非移除掉
export default class Animation extends Component {
    state = {
        show: false,
        animationState: HAS_LEAVE
    }

    componentWillMount() {
        if (this.props.show && !this.state.show) {
            this.state.show = true;
            this.state.animationState = ENTERING;
        }

        if (!this.props.show && this.state.show) {
            this.state.show = false;
            this.state.animationState = LEAVEING;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show && !this.state.show) {
            this.state.show = true;
            this.state.animationState = ENTERING;
        }

        if (!nextProps.show && this.state.show) {
            this.state.show = false;
            this.state.animationState = LEAVEING;
        }
    }

    onAnimationEnd = (e) => {
        if (this.state.animationState === ENTERING) {
            this.setState({
                animationState: HAS_ENTER
            });
            this.props.onEnter && this.props.onEnter();
        } else if (this.state.animationState === LEAVEING) {
            this.setState({
                animationState: HAS_LEAVE
            });
            this.props.onEnter && this.props.onLeave();
        }
    }

    render() {
        const {
            animationState
        } = this.state;

        const {
            className = '',
            children
        } = this.props;

        const animationClass = classnames({
            [`${this.props.animationName}-enter`]: animationState === ENTERING,
            [`${this.props.animationName}-leave`]: animationState === LEAVEING
        }, className);
        
        return (
            <div
                onAnimationEnd={this.onAnimationEnd}
                className={animationClass}
                style={{
                    display: animationState === HAS_LEAVE ? 'none' : 'block'
                }}
            >
                { children }
            </div>
        );
    }
}