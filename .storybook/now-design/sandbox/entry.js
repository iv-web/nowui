import Path from 'path';
import React from 'react'
import ReactDom from 'react-dom'
import Wrapper from './wrapper'
import Menu from './menu'
import { render } from '@now-design/sandbox'

// 组件name: name_type
const getComponentObject = (nameProperty) => {
  const target = nameProperty.split('_');

  if(target.length === 1) {
    return {
      name: target[0]
    }
  }

  return {
    name: target[0],
    type: target[1]
  }
};

function loadStories(componentName) {
  const targetName = getComponentObject(componentName)

  // 按需加载组件
  require.ensure(['./index.js'], function(require) {
    const req = require.context('bundle!./../../../packages', true, /.now.js$/)
    const storyPath = req.keys().find((filename) => {
      return filename.includes(targetName.name)
    })
    const componentHandler = req(storyPath)

    componentHandler((component) => {
      ReactDom.render(
        <Wrapper menu={Menu} title={componentName}>
          {React.createElement(
            component.default || component[targetName.type],
          )}
        </Wrapper>,
        document.getElementById('root')
      )
    })
  })
}

render(loadStories)
