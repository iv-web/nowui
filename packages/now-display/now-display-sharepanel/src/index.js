'use strict'

import '../assets/index.scss'

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Animation from 'now-base-animation';
import eventname from 'eventname';

export default class SharePanel extends Component {
    static defaultProps = {
        show: true,
        types: ['wechat', 'timeline', 'qq', 'qzone', 'weibo']
    }

    static typesMap = {
        wechat: '微信',
        timeline: '朋友圈',
        qzone: 'QQ空间',
        qq: 'QQ',
        weibo: '微博'
    }

    static create(opts) {
        if(!opts.dom) {
            opts.dom = document.createElement('div');
            opts.dom.id = `now-dialog-wrapper-${Date.now()}`;
            document.body.appendChild(opts.dom);
        }

        const dom = opts.dom;

        ReactDom.render(
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

    // componentDidMount() {
    //     document.addEventListener(eventname.touchstart, this.clickOutSide);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener(eventname.touchstart, this.clickOutSide);
    // }

    // clickOutSide = (e) => {
    //     let n = e.target;
    //     while (n && n !== document && n !== this.container) {
    //         n = n.parentNode;
    //     }
    //     if (n !== this.container && this.props.show) {
    //         this.props.onClickOutSide && this.props.onClickOutSide();
    //     }
    // }

    onClick(name) {
        this.props.onClick && this.props.onClick(name);
    }

    render() {
        let { state, props } = this;

        const {
            onClick,
            onCancel,
            show
        } = props;

        return (
            <Animation show={show} className="now-share-panel" animationName="sharePanel" ref={(c) => { this.container = c; }} >
                <ul>
                    {
                        props.types.map((item) => (
                            <li key={item.name}>
                                <span
                                    className={'item icon-' + item}
                                    onClick={() => {onClick(item)}}
                                >
                                    {SharePanel.typesMap[item]}
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <a className="cancel" href="javascript:" onClick={onCancel}>取消</a>
            </Animation>
        )
    }
}
