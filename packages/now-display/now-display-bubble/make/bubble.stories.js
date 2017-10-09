import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Display 业务组件', module)
  .add("Bubble 点赞动画", () => (
    <div>
      <MarkdownPreview
        className="markdown-body"
        value={ReadMe}
        name="display-bubble"
        key="Bubble 点赞动画"
      />
    </div>
))