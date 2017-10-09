import React, { Component } from 'react';

const loadedImages = {};

export default class ImageLoader extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {  
            visable: false
        }
    }

    static defaultProps = {
        tag: 'div',
        forceShow: false,
        placeholder: '',
        src: '',
        errorImg: ''
    }

    /**
     * 开始加载图片回调
     */
    static onStart(cb) {
        ImageLoader.onStartCallback = cb
    }

    /**
     * 成功加载图片回调
     */
    static onLoad(cb) {
        ImageLoader.onLoadCallback = cb
    }
    
    /**
     * 图片加载失败回调
     */
    static onError(cb) {
        ImageLoader.onErrorCallback = cb
    }


    componentWillReceiveProps(nextProps) {
        const { props, state } = this;

        if (nextProps.src !== props.src) {
            this.state.visable = false;
        	this.load(nextProps.src);
        }
    }

    componentDidMount() {
        const { props, state } = this;
        this.mounted = true;
        this.load(this.props.src);
    }

    getImageUrl = () => {
        let imageUrl = '';

        if(this.state.visable === 'error') {//error 优先级最高
            imageUrl = this.props.errorImg || this.state.errorSrc || this.props.placeholder;
        } else if(this.props.forceShow) {//强制显示
            imageUrl = this.props.src; 
        } else if(this.state.visable) {
            imageUrl = this.props.src ? this.props.src : this.props.placeholder;
        } else {
            imageUrl = this.props.placeholder; 
        }

        return imageUrl;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    setErrorSrc(src) {
        if(!this.mounted) {
            return ;
        }

        this.setState({
            errorSrc: src 
        });
    }

    /**
     * 加载显示图片
     */
    load = (src) => {
        if(!src) { //没有传入 src 不显示
        	return;
        }

        this.props.onStart && this.props.onStart(this)

        ImageLoader.onStartCallback && ImageLoader.onStartCallback(src, this)

        const succ = () => {
            loadedImages[src] = true;
            if (this.mounted && this.props.src === src) {
                this.setState({
                    visable: true
                });

                this.props.onLoad && this.props.onLoad(src, this)
            }
            ImageLoader.onLoadCallback && ImageLoader.onLoadCallback(src, this)
        };

        const err = () => {
            if (this.mounted && this.props.src === src) {

                this.setState({
                    visable: 'error'
                });
                
                this.props.onError && this.props.onError(src, this)
            }

            console.error('LazyLoad image load error', src);

            ImageLoader.onErrorCallback && ImageLoader.onErrorCallback(src, this)
        };

        if (loadedImages[src]) {
            this.setState({
                visable: true
            });
            setTimeout(succ, 10);
        } else {
            const img = new Image();
            img.onload = succ;
            img.onerror = err;
            img.src = src;
        }
    }

    /**
     * 设置图片至属性对象
     * img设置src, 其它设置backgroundImage
     * @param {Object} attr 属性对象
     * @param {String} tag 标签名
     * @param {String} src url
     */
    _addSrcToAttr(attr, tag) {
        const src = this.getImageUrl();

        if (tag === 'img') {
            attr.src = src;
        } else {
            attr.style = Object.assign({}, attr.style, {
                backgroundImage: `url(${src})`
            });
        }
    }

    render() {
        const { state, props } = this,
            // 标签名
            tag = this.state.visable === 'error' ? 'div' : props.tag;

        const attr = Object.assign({}, props || {}, {
            tag: undefined,
            src: undefined,
            placeholder: undefined,
            ref: (c) => {
                this.node = c;
            }
        });

        this._addSrcToAttr(attr, tag);

        return React.createElement(tag, attr, this.props.children || null)
    }
}