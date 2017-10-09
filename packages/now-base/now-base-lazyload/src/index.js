
import React, { Component } from 'react';
import Pool from './pool'

const LOADED_ERROR = 0;

const loadedImages = {};

/**
 * @class LazyLoad
 * @usage
 *  <LazyLoad className="" src="" />
 *  渲染成:
 *  <div class="" style="background-image: url()"></div>
 *
 *  <LazyLoad tag="img" className="" src="" />
 *  渲染成:
 *  <img class="" src="" />
 */
export default class LazyLoad extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            // 是否显示图片
            // 外界可以通过传入appear让其立刻显示
            appear: props.appear || false, 
            // 成功加载的图片, 加载失败时0
            loaded: null 
        }

        // 如果图片之前成功加载了直接显示, 防止闪动
        if (props.src && loadedImages[props.src]) {
            Object.assign(this.state, {
                appear: true,
                loaded: props.src
            });
        }
    }

    static defaultProps = {
        tag: 'div',
        appear: false,
        placeholder: '',
        src: '',
        errorholder: '',
        verticalThreshold: typeof window !== 'undefined' && window.innerHeight || 300, // 竖直方向提前加载的高度
        horizontalthreshold: typeof window !== 'undefined' && window.innerWidth || 200  // 水平方向提前加载的高度
    }

    /**
     * 开始加载图片回调
     */
    static onStart(cb) {
        LazyLoad.onStartCallback = cb
    }

    /**
     * 成功加载图片回调
     */
    static onLoad(cb) {
        LazyLoad.onLoadCallback = cb
    }
    
    /**
     * 图片加载失败回调
     */
    static onError(cb) {
        LazyLoad.onErrorCallback = cb
    }

    /**
     * 更新所有元素
     */
    static update() {
        Pool.update();
    }

    componentWillReceiveProps(nextProps) {
        const { props, state } = this;
        // 外界触发显示
        if (nextProps.appear !== props.appear && nextProps.appear) {
            this.appear();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { props, state } = this;

        // 设置appear=true或者修改图片
        if (state.appear && props.src 
            && (state.appear !== prevState.appear || props.src !== prevProps.src)
        ) {
            this.mounted && this.load();
        }
        if (state.appear && !props.src 
            && (state.appear !== prevState.appear || props.src !== prevProps.src)
        ) {
            this.mounted && console.warn('LazyLoad image empty on appear', this);
        }
    }

    componentDidMount() {
        const { props, state } = this;
        this.mounted = true;
        // 如果已经显示了无需处理
        if (typeof state.loaded !== 'string') {
            // 如果需要立刻显示, 就不需要Pool了
            if (state.appear) {
                props.src && this.load();
            } else {
                Pool.add(this);
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        Pool.remove(this);
    }

    /**
     * 加载显示图片
     */
    load() {
        const { src } = this.props;

        this.props.onStart && this.props.onStart(this)

        LazyLoad.onStartCallback && LazyLoad.onStartCallback(src, this)

        const succ = () => {
            loadedImages[src] = true;

            if (this.mounted && this.props.src === src) {
                this.setState({
                    loaded: src
                });

                this.props.onLoad && this.props.onLoad(this)
            }
            LazyLoad.onLoadCallback && LazyLoad.onLoadCallback(src, this)
        };

        const err = () => {
            if (this.mounted && this.props.src === src) {
                if (!this.state.loaded) {
                    this.setState({
                        loaded: LOADED_ERROR
                    });
                }

                this.props.onError && this.props.onError(this)
            }

            console.error('LazyLoad image load error', src);

            LazyLoad.onErrorCallback && LazyLoad.onErrorCallback(src, this)
        };

        if (loadedImages[src]) {
            setTimeout(succ, 10);
        } else {
            const img = new Image();
            img.onload = succ;
            img.onerror = err;
            img.src = src;
        }
    }

    /**
     * 显示图片
     */
    appear() {
        if (!this.state.appear) {
            this.setState({
                appear: true
            });
        }
    }

    /**
     * 设置图片至属性对象
     * img设置src, 其它设置backgroundImage
     * @param {Object} attr 属性对象
     * @param {String} tag 标签名
     * @param {String} src url
     */
    _addSrcToAttr(attr, tag, src) {
        if (!src) {
            return;
        }
        if (tag === 'img') {
            attr.src = src
        } else {
            attr.style = Object.assign({}, attr.style, {
                backgroundImage: `url(${src})`
            })
        }
    }

    render() {
        const { state, props } = this,
            // 标签名
            tag = props.tag;

        const attr = Object.assign({}, props || {}, {
            tag: undefined,
            src: undefined,
            placeholder: undefined,
            ref: 'container'
        });

        if (props.placeholder) {
            // placeholder
            this._addSrcToAttr(attr, tag, props.placeholder)
        }

        if (state.loaded !== null) {
            if (state.loaded) {
                this._addSrcToAttr(attr, tag, state.loaded)
            } else if (state.loaded === LOADED_ERROR && props.errorholder) {
                // 图片加载失败时的图片
                this._addSrcToAttr(attr, tag, props.errorholder)
            }
        }

        return React.createElement(tag, attr, this.props.children || null)
    }
}

export {
    Pool
}
