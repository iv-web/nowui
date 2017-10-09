import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Banner from '../src/index.js'

export default class BannerWrapper extends Component{
    state = {
        items: [{
            picUrl: 'https://pub.idqqimg.com/pc/misc/files/20170324/8d0f7c5842054d37a7b2bc12660986b0.png',
        }, {
            picUrl: 'https://pub.idqqimg.com/pc/misc/files/20170324/52425fcfe6564c349352fe0a66fdbb84.png'
        }, {
            picUrl: 'https://p.qpic.cn/qqconadmin/0/4bd001ff385c45ddac39f3e0827ac30f/0'
        }],
        currentIndex: 0
    }

    render() {
        return (
            <Banner {...this.state} />
        )
    }
}

sandboxStore.add('banner', BannerWrapper);