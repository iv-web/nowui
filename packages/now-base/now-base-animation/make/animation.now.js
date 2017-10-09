import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Animation from '../src/index.js'
import Button from 'now-base-button'
import './preview.scss'

export default class Preview extends Component {
    state = {
        show: false
    }
    onClick = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const { show } = this.state;
        return (
            <div>
                <Button onClick={this.onClick}>
                    {show ? '隐藏' : '显示'}
                </Button>
                <Animation show={show} animationName="float" className="test-animation">
                </Animation>
            </div>
        )
    }
}

sandboxStore.add('aniamtion', Preview);