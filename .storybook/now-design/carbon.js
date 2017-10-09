import React, { Component } from 'react'
import logo from './manager/assets/now.jpg'

const wrapStyle = {
  width: '180px',
  marginBottom: '35px',
  fontSize: '12px'
}

const imgStyle = {
  width: '100%'
}

const linkStyle = {
  color: '#999'
}

class Carbon extends Component {
  render() {
    return (
      <div style={wrapStyle}>
        <a href="https://now.qq.com/" style={linkStyle}>
          <figure>
            <img
             src={logo}
             style={imgStyle}
             alt="now直播"
            />
          </figure>
          NOW直播——腾讯旗下全民直播平台
        </a>
      </div>
    )
  }
}

export default Carbon