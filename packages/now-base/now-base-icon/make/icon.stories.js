import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Base 基础组件', module)
    .add('Icon', () => (
      <div>
        <MarkdownPreview
          className="markdown-body"
          value={ReadMe}
          name="base-icon"
          key="base-icon"
        />
      </div>
    ))