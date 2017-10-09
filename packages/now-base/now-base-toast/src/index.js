import React, { Component } from 'react';
import Animation from 'now-base-animation';
import '../assets/index.scss'

export default class Toast extends Component {
    static defaultProps = {
        timeout: 2000,
        callback:()=>{},
        lasting:false
    }

    constructor(context) {
        super(context)
        this.state = {
            content: this.props.content,
            isshow:　!!this.props.content
        }

    }

    componentWillReceiveProps (nextProps) {
        // 每次传入时，重新初始化元素
        if(nextProps.content !== this.state.content) {
            this.state.content = nextProps.content
            this.state.isshow = !!nextProps.content
        }
    }


    componentDidMount () {
        if(this.state.isshow && !this.props.lasting) {
            clearTimeout(this.id)
            this.id = setTimeout(()=>{
                this.setState({
                    content: null,
                    isshow: false
                });
                this.props.callback();
            }, this.props.timeout)
        }
    }

    componentDidUpdate () {
        if(this.state.isshow && !this.props.lasting) {
            clearTimeout(this.id)
            this.id = setTimeout(()=>{
                this.setState({
                    content: null,
                    isshow: false
                });
                this.props.callback();
            },this.props.timeout)
        }
    }

    // 处理相关数据
        // 有: className, DOM 节点映射
    mapClass(type){
        let toastClass;
        switch (type) {
            case 'warn':
                toastClass = 'toastWarn'
                break
            case 'error':
                toastClass = 'toastError'
                break
            case 'success':
                toastClass = 'toastSuccess'
                break
            case 'info':
            default:
                toastClass = 'toastInfo'
                break
        }
        return toastClass;
    }
    render () {
        let {
            type,content
        } = this.props,
            toastClass;
        // 映射 className
        toastClass = this.mapClass(type);

        // TODO
        // 如何改变状态值 shouldShow 的状态值

        // 设置消失定时
        return (
            <Animation
                animationName="now-toast"
                key={this.state.content + this.props.type}
                className={`now-toast ${toastClass}`}
                show={!!content}
            >
                {content}
            </Animation>
        )
    }
}