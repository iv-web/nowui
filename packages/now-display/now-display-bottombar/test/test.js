import TestUtils from 'react-addons-test-utils';
import Downloadbar from '../src/index.js'
import React from 'react'
import ReactDom from 'react-dom'
import {
  describeWithDOM,
  mount,
  render,
  shallow,
  spyLifecycle
} from 'enzyme';
import { expect } from 'chai'

let onClickResult = false
const mockData = {
    wording: 'hellow world',
    downWording: 'download now',
    onClick: () => {
      onClickResult = true
    }
}

describe('downloadbar ', function () {

  const app = mount(<Downloadbar {...mockData} />)
  it('组件渲染', (done) => {
    let $wording = app.find('.download span')
    expect($wording.length).to.equal(1)
    expect($wording.text()).to.equal(mockData.wording)

    let $btn = app.find('.download-btn')
    expect($btn.length).to.equal(1)
    expect($btn.text()).to.equal(mockData.downWording)
    done()
  })
  it('不传入 wording 时， 不展示文案', (done) => {
    app.setProps({ wording: null })
    let $wording = app.find('.download span')
    expect($wording.length).to.equal(0)
    done()
  })

  it('不传入 downWording 时， 不展示 点击按钮', (done) => {
    app.setProps({ downWording: null })
    let $btn = app.find('.download-btn')
    expect($btn.length).to.equal(0)
    done()
  })

  it('点击事件', (done) => {
    const app = mount(<Downloadbar {...mockData} />)
    let $btn = app.find('.download-btn')
    $btn.simulate('click')
    expect(onClickResult).to.equal(true)
    done()
  })
})


