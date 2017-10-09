import './assets/wrapper.scss'
import React, { Component } from 'react'
import AraleQRCode from 'arale-qrcode'
import url from 'url'
import detector from 'detector'
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

export default class Wrapper extends Component {
  constructor() {
    super()

    this.state = {
      isShowMenu: false
    }

    this.toggleMenu = () => this.setState({ isShowMenu: !this.state.isShowMenu })
  }

  render () {
    const {
      children,
      menu,
      title
    } = this.props

    const { isShowMenu } = this.state
    const menuList = Object.keys(menu).map((path, i) => (
      <li className={`${path === title ? 'actived' : ''}`} key={i}>
        <a href={`iframe.html?name=${path}`}>{menu[path]}</a>
      </li>)
    )

    const device = detector.device.name
    const isPc = device === 'pc' || device === 'mac'

    return (
      <div className="nd-preview-wrapper">
        {isPc ? null : <header className="wrapper-header">
          {menu[title]}
          <i
            className="header-more"
            onClick={this.toggleMenu}
          ></i>
        </header>}
        <TransitionGroup>
          <CSSTransition
            className="list-menu"
            timeout={{
              exit: 300,
              enter: 300
            }}
          >
            {isShowMenu ? <nav className="preview-nav">
            <ul>
              {menuList}
            </ul>
          </nav> : <div></div>}
          </CSSTransition>
        </TransitionGroup>
        <div style={{ paddingTop: `${isPc ? 0 : 40}px`, position: 'relative', height: '100%', boxSizing: 'border-box'}}>
          {children}
        </div>
      </div>
    )
  }
}