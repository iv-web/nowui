import React, { Component } from 'react'
import SharePanel from '../src/index.js'
import { sandboxStore } from '@now-design/sandbox'
import Button from 'now-base-button'

export default class SharePanelWrapper extends Component {
    state = {
        show: true
    }

    toggle = () => {
      this.setState({
        show: !this.state.show
      })
    }

    onClick = (name) => {
        alert(name);
    }

    hide = () => {
      this.setState({
        show: false
      })
    }
    
    render () {
        const {
            show,
            shareTypes
        } = this.state

        return (
            <div>
                <Button onClick={this.toggle}>
                    {show ? '关闭' : '显示'}
                </Button>
                <SharePanel 
                  show={show}
                  onClick={this.onClick}
                  onClickOutSide={this.hide}
                />
            </div>
        )
    }
}

sandboxStore.add('sharepanel', SharePanelWrapper)