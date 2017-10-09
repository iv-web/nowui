import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Base 基础组件', module)
    .add('Layout', () => (
      <div>
        <MarkdownPreview
          className="markdown-body"
          value={ReadMe}
          name="base-layout"
          key="base-layout"
        />
      </div>
    ))