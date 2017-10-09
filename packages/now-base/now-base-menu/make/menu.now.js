import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Menu from '../src/index.js'
import Button from 'now-base-button'

const data = [{
    name: "管理",
    onClick: function() {}
}, {
    name: "个人中心",
    onClick: function() {}
}]

export default class Preview extends Component {
    state = {
        show: false
    }

    onClick = () => {
        this.setState({
            show: !this.state.show
        });
    }

    onClose = () => {
        this.setState({
            show: false
        });
    }

    render() {
        const { show } = this.state;
        return (
            <div>
                <Button onClick={this.onClick}>
                    {show ? '隐藏菜单' : '显示菜单'}
                </Button>
                <Menu options={data} show={show} onClose={this.onClose}>
                </Menu>
            </div>

        )
    }
}

sandboxStore.add('menu', Preview)