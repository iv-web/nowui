import React,  { Component } from 'react'
import { throttle } from 'lodash'
import Preview from '@now-design/sandbox/preview'
import Carbon from '@now-design/carbon'

const marked = require('marked')
const hljs = require('highlight.js')

const renderer = new marked.Renderer()
renderer.head = []

renderer.heading = function (text, level) {
  if(level > 1) {
    renderer.head.push(text)
  }
  return `<h${level} class="anchor" id="${text}">${text}</h${level}>`
}

marked.setOptions({
  renderer,
  highlight: (code) => hljs.highlightAuto(code).value
})

const getLast = (arr) => arr[arr.length - 1]

/*
*
* 缓动函数
* @param {number} t 当前时间
* @param {number} b 初始位置
* @param {number} c 变量
* @param {number} d 持续时间
* 
*/
const easeOut = (t, b, c, d) => (-c *(t/=d)*(t-2) + b)

export default class MarkdownPreview extends Component {
  constructor(props) {
    super()

    this.state = {
      actived: '',
      isOverTop: false
    }

    this.scrollBuffer = 20
    this.scrollStep = 10
    this.previewAnchers = props.name ? ['代码演示', '预览二维码'] : []

    renderer.head = []
    this.content = marked(props.value)
    this.anchors = renderer.head.concat(this.previewAnchers)

    this.onScroll = this.onWinScroll.bind(this)
  }

  componentDidMount() {
    this.anchorObjs = this.anchors.map((anchor) => {
      const elem = document.getElementById(anchor)
      return {
        name: anchor,
        top: elem.offsetTop
      }
    })
    document.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll, false)
  }

  onWinScroll(e) {
    const top = e.target.body.scrollTop
    const activedAnchor = this.anchorObjs.find((anchor) => anchor.top > top)
    const actived = activedAnchor ? activedAnchor.name : getLast(this.anchorObjs).name
    const isOverTop = top > 120

    this.setState({
      actived,
    })

    this.setState({
      isOverTop,
    })
  }

  onScrollToAnchor(targer) {
    return () => {
      const target = document.getElementById(targer).offsetTop - this.scrollBuffer
      const total = target - document.body.scrollTop
      this.time = 0
      this.scrollToAnchorAnimation(total, document.body.scrollTop)
    }
  }

  scrollToAnchorAnimation(total, origin) {
    requestAnimationFrame(() => {
      document.body.scrollTop = Math.ceil(easeOut(this.time, origin, total, this.scrollStep))
      this.time ++
      if(this.time < this.scrollStep) {
        this.scrollToAnchorAnimation(total, origin)
      }
    })
  }

  render() {
    const {
      className,
      name
    } = this.props
    const { actived, isOverTop } = this.state
    const navLists = this.anchors.map((anchor, index) => (
      <li
        key={index}
        className={`${actived === anchor ? 'actived' : ''}`}
        onClick={this.onScrollToAnchor(anchor)}
      >
        {anchor}
      </li>))

    const preview = name && (typeof name === 'string' ? <Preview name={name} anchers={this.previewAnchers}/> :
          name.map((item) => <Preview name={item} anchers={this.previewAnchers}/>))

    return (
      <div className="markdown-preview">
        <div className={className} dangerouslySetInnerHTML={{__html: this.content}} />
        <nav className="preview-nav">
          <Carbon />
          <ul>{navLists}</ul>
        </nav>
        {preview}
      </div>
    )
  }
}
