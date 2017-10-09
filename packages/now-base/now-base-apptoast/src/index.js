import '../assets/index.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Aniamtion from 'now-base-animation';

export default class Toast extends Component {
    static create(opts) {
        if(!opts.dom) {
            opts.dom = document.createElement('div');
            opts.dom.id = `now-apptoast-wrapper-${Date.now()}`;
            document.body.appendChild(opts.dom);
        }

        const dom = opts.dom;

        ReactDOM.render(
            React.createElement(this, opts),
            dom
        );

        return {
            remove: function() {
                ReactDOM.unmountComponentAtNode(dom);
                document.body.removeChild(dom);
            }
        }
    }

    static defaultProps = {
        content: '',
        type: 'info',
        top: 0,
        style: {}
    }

    render () {
        let {
            content,
            type,
            top,
            style,
            children
        } = this.props

        let toastClass = ''
        switch (type) {
            case 'warn':
                toastClass = 'toastWarn'
                break
            case 'error':
                toastClass = 'toastError'
                break
            case 'success':
                toastClass = 'toastSuccess'
                break
            case 'info':
            default:
                toastClass = 'toastInfo'
                break
        }

        const toastStyle = Object.assign({}, style, {
            'paddingTop': top + 8 + 'px'
        })

        return (
            <Aniamtion
                animationName="now-apptoast"
                key={type + content}
                show = {!!(children || content)}
                className={`now-apptoast ${toastClass}`} 
                {...this.props}
                style={toastStyle}
            >
                    {
                        children ?
                        children : content
                    }
            </Aniamtion>
        )
    }
}
