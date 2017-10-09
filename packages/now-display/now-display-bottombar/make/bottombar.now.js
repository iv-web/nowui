import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import Downloadbar from '../src'

export default class DownloadbarWrapper extends Component {
    render () {
        return (
            <Downloadbar 
                wording="Adam邀请你一起看直播"
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