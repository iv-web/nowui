import ReactDom from 'react-dom'
import {scrollParent, contains} from './util'


/**
 * @class Pool
 */
class Pool {
    constructor() {
        this.elements = []
        this.scrollParent = []
    }

    /**
     * bind
     * @private
     */
    _bind() {
        window.addEventListener('scroll', this.update)
        window.addEventListener('resize', this.update)
        // 定时检查一下
        setInterval(this.update, 2000);
    }

    /**
     * 开始加载图片回调
     */
    onStart = () => {
        console.error('LazyLoad.Pool.onStart方法已废弃,请使用LazyLoad.onStart');
    }

    /**
     * 成功加载图片回调
     */
    onLoad = () => {
        console.error('LazyLoad.Pool.onLoad方法已废弃,请使用LazyLoad.onLoad');
    }
    
    /**
     * 图片加载失败回调
     */
    onError = () => {
        console.error('LazyLoad.Pool.onError方法已废弃,请使用LazyLoad.onError');
    }

    /**
     * 更新池中所有图片
     * TODO 延时合并调用
     */
    update = () => {
        [].slice.call(this.elements).forEach(item => this._update(item));
    }

    /**
     * 更新图片
     * @private
     * @param {LazyLoad} component
     */
    _update(component) {
        if (this._inviewport(component)) {
            this.remove(component);
            component.appear();
        }
    }

    /**
     * 判断元素是否在视图中
     * @private
     * @param {LazyLoad} component
     * @return {Boolean} 
     */
    _inviewport(component) {
        const node = ReactDom.findDOMNode(component),
            width = window.innerWidth,
            height = window.innerHeight,
            verticalThreshold = component.props.verticalThreshold,
            horizontalthreshold = component.props.horizontalthreshold,
            offset = node.getBoundingClientRect()

        return offset.width && offset.height
            && offset.top > -verticalThreshold
            && offset.top < height + verticalThreshold
            && offset.left > -horizontalthreshold
            && offset.left < width + horizontalthreshold
    }

    /**
     * 添加lazy
     * @param {LazyLoad} component
     */
    add(component) {
        // init
        if (this._bind) {
            this._bind();
            this._bind = null;
        }

        const node = ReactDom.findDOMNode(component);
        // 查找内滚动父级
        scrollParent(node).forEach((parent) => {
            this.addScrollParent(parent);
        });

        this.elements.push(component);

        setTimeout(() => {
            if (this.elements.indexOf(component) !== -1) {
                this._update(component);
            }
        }, 10);
    }

    /**
     * 添加一个滚动父级元素
     * @param {HTMLElement} node 
     */
    addScrollParent(node) {
        if (this.scrollParent.indexOf(node) === -1) {
            this.scrollParent.push(node)
            node.addEventListener('scroll', this.update)
        }
    }

    /**
     * 移除lazy
     * @param {LazyLoad} component
     */
    remove(component) {
        const index = this.elements.indexOf(component)
        if (index !== -1) {
            this.elements.splice(index, 1)
        }
        // 触发检查scrollParent
        this._pendingCheckScrollParent && clearTimeout(this._pendingCheckScrollParent);
        this._pendingCheckScrollParent = setTimeout(() => {
            this._checkScrollParent();
        }, 10);
    }

    /**
     * 检查scrollParent是否在dom树中,不在的移除,防止内存泄露
     */
    _checkScrollParent() {
        this.scrollParent = this.scrollParent.filter(node => {
            return node === window || contains(document.body, node)
        });
    }
}

export default new Pool()

