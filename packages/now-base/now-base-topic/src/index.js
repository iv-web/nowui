import '../assets/topic.scss';

import React, { Component } from 'react';

export class Topic extends Component {
    static defaultProps = {
        height:'160px',
        width:'100%'
    }
    
    setWidth(num){
        switch (num){
            case 1:
                return '100%'
            default:
                return num*80+'%';
        }
    }
    render() {
        let {
            children,
            height,
            width
        } =this.props;
        let innerWidth = this.setWidth(children.length || 1);
        return (
            <div style={{
                width,
                overflowY:'auto',
                height
            }}>
                <div className="now-base-topic-ctn" style={{
                    width:innerWidth
                }} >{children}</div>
            </div>
        )
    }
}

export class TopicItem extends Component {
    static defaultProps = {
        url:'',
        fontSize:'18px',
        fontColor:'#fff'
    }

    jump(url){
        window.location.href=url;
    }
    
    render() {
        let {url,src,onClick,children,fontSize,fontColor} = this.props;
        return (
            <div style={{
                backgroundImage:`url(${src})`,
                fontSize,
                color:fontColor
            }} onClick={()=>{
                // 如果有点击事件则执行
                onClick && onClick();
                // 如果传入跳转 url 则执行跳转操作
                url && this.jump(url);
            }}>{children}</div>
        )
    }
}