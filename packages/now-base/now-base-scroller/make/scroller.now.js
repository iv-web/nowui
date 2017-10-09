import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Scroller from '../src/index.js'
import './preview.scss';

export default class Preview extends Component {
    render() {
        return (
            <Scroller className="test-scroller">
                <div className="div1"></div>
                <div className="div2"></div>
                <div className="div3"></div>
            </Scroller>
        )
    }
}

sandboxStore.add('scroller', Preview)