import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Activity 活动组件', module)
  .add('选项卡组件 Tab', () => (
    <div>
      <MarkdownPreview
        className="markdown-body"
        value={ReadMe}
        name="activity-tab"
        key="选项卡组件 Tab"
      />
    </div>
));


