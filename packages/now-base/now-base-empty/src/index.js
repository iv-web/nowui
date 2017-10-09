import '../assets/index.scss'
import React, { Component } from 'react'

export default class Dialog extends Component {
    static defaultProps = {
        emptyType: ''
    };

    render () {
        const {
            emptyType,
            children
        } = this.props;

        let emptyClass = 'now-empty-1';

        switch (emptyType) {
            case 'gift': 
                emptyClass = 'now-empty-2';
                break;
            case 'search': 
                emptyClass = 'now-empty-3';
                break;
            case 'chat': 
                emptyClass = 'now-empty-4';
                break;
            case 'error':
                emptyClass = 'now-empty-5';
                break;
            default:
                emptyClass = 'now-empty-1'
        }

        return (
            <div className="now-empty-wrapper">
                <div className="now-empty-inner">
                    <div className={`now-empty-icon ${emptyClass}`}></div>
                    <div className="wording">
                        {
                            children 
                        }
                    </div>
                </div>
            </div>
        )
    }
}
