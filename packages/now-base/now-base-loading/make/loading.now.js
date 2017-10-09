import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Loading from '../src/index.js'

export default class LoadingWrapper extends Component {
    render() {
        return (
            <Loading>
                加载中...
            </Loading>
        )
    }
}