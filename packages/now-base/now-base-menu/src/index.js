import '../assets/index.scss';

import React, { Component } from 'react'
import Animation from 'now-base-animation'

export default class Menu extends Component {
    onClose = (e) => {
        const { onClose } = this.props;
        e.stopPropagation();
        onClose(e);
    }
    
    static create(opts) {
        if(!opts.dom) {
            opts.dom = document.createElement('div');
            opts.dom.id = `now-menu-${Date.now()}`;
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


    render() {
        let { className, options, closePanel, show } = this.props;
        
        return (
            <Animation animationName="now-menu" show={show} className="now-menu" >
                {
                    options.map(({name, onClick}, index) => {
                        return (
                            <li key={index} onClick={onClick} className="now-menu-item">
                                {name}
                            </li>
                        )
                    })
                }
                <li onClick={this.onClose} className="now-menu-item">取消</li>
            </Animation>
        )
    }
}
