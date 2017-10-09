import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from '../README.md'

storiesOf('Activity 活动组件', module)
  .add('城市选择 CitySelect', () => (
    <div>
      <MarkdownPreview
        className="markdown-body"
        value={ReadMe}
        name="activity-city-select"
        key="城市选择 CitySelect"
      />
    </div>
))


