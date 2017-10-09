import TestUtils from 'react-addons-test-utils';
import Bubble from '../src/index.js'
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

describe('Bubble 组件测试', function () {

  const app = mount(<Bubble/>);
  it('Bubble 组件渲染', () => {
    expect(app.find('canvas').length).to.equal(1);
  })
  
});


