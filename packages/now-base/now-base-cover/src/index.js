import '../assets/index.scss'
import React, { Component } from 'react'
import Lazyload from 'now-base-lazyload'
import defaultCover from '../assets/images/cover.svg'

export default class Cover extends Component {
    static defaultProps = {
        src: defaultCover,
        placeholder: defaultCover
    };

    render() {
        return (
            <Lazyload 
                className="now-livecover"
                {...this.props}
            >
            </Lazyload>
        )
    }
}
