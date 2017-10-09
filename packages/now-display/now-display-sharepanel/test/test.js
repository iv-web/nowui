import TestUtils from 'react-addons-test-utils';
import Component from '../src/index.js'
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

let eventCounter = {}

const mockData = {
    types: [
        {
          share_type: 2,
          name: 'wechat',
          title: '微信'
        }, 
        {
            share_type: 3,
            name: 'timeline',
            title: '朋友圈'
        }, 
        {
            share_type: 0,
            name: 'qq',
            title: 'QQ'
        } 
    ],
    onClick: function() {
        eventCounter.onClick = (eventCounter.onClick || 0) + 1;
    }
}

describe('SharePanel', function () {

  it('列表长度', () => {
    const app = render(<Component {...mockData} />)
    expect(app.find('ul li').length).to.equal(mockData.types.length)
  })    

  it('点击分享', () => {
    const app = shallow(<Component {...mockData} />)
    app.find('.item').at(0).simulate('click');
    expect(eventCounter.onClick).to.equal(1);
  })    
})

