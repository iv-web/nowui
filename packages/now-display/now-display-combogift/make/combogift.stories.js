import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Display 业务组件', module)
  .add("ComboGift 连击礼物", () => (
    <div>
      <MarkdownPreview
        className="markdown-body"
        value={ReadMe}
        name="display-combogift"
        key="display-combogift"
      />
    </div>
))


