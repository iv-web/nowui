import '../assets/index.scss'
import React, { Component } from 'react'
import Lazyload from 'now-base-lazyload'
import defaultAvatar from '../assets/images/avatar.svg'

export default class Avatar extends Component {
    static defaultProps = {
        src: defaultAvatar,
        placeholder: defaultAvatar
    };

    render() {
        return (
            <Lazyload className="now-avatar" {...this.props} />
        )
    }
}
