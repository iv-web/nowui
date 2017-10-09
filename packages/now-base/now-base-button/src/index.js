import '../assets/index.scss'
import React, { Component } from 'react'

//支持的 size 
const sizeList = ['small', 'large', 'middle'];

export default class Button extends Component {
    static defaultProps = {
        type: 1,
        disabled: false,
        size: 'large',
        style: {}
    };

    render() {
        let {
            style,
            type,
            size,
            disabled,
            className,
            children
        } = this.props;

        if(type> 3 || type < 0) {
            type = 1;
            console.warn('now-button 允许使用的 type 只有 1 2 3')
        }

        if(sizeList.indexOf(size) < 0) {
            type = 'large';
            console.warn('now-button 支持的 size 只支持 small middle large')
        }

        let buttonClass = `now-button now-button-type${type} now-button-${size}` + (className || '');

        buttonClass += disabled ? ' disabled' :'';

        return (
            <div {...this.props} className={buttonClass}>
                {
                    children
                }
            </div>
        )
    }
}
