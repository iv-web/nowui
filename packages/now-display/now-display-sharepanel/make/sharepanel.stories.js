import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Display 业务组件', module)
  .add("SharePanel 分享面板", () => (
    <div>
      <MarkdownPreview
        className="markdown-body"
        value={ReadMe}
        name="display-sharepanel"
        key="display-sharepanel"
      />
    </div>
))