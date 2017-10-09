import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Base 基础组件', module)
// Toast 为你的组件名
  .add('Toast', () => (
    <div>
      <MarkdownPreview
        className="markdown-body"
        value={ReadMe}
        name="base-toast"
        key="base-toast"
      />
    </div>
))
