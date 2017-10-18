import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import Downloadbar from '../src'

export default class DownloadbarWrapper extends Component {
    render () {
        return (
            <Downloadbar 
                wording="点我下载now"
                downWording ="下载"
                logo="https://11.url.cn/now/activity/april-lottery/img/logo_e29054a.png"
                onClick={ () => {
                    alert('点击下载按钮')
                } }
            />
        )
    }
}

sandboxStore.add('downloadbar', DownloadbarWrapper)