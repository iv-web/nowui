import './assets/index.scss'
import React from 'react'
import Header from './header'
import Stories from './stories'
import TextFilter from './text_filter'
import pick from 'lodash.pick'

const mainStyle = {
  padding: 20,
}

const storyProps = ['stories', 'selectedKind', 'selectedStory', 'onSelectStory']

const LeftPanel = (props) => (
  <div className="nd-left-panel" >
    <Header
      name={props.name}
      url={props.url}
      openShortcutsHelp={props.openShortcutsHelp}
    />
    {
      null && (
        <TextFilter
          text={props.storyFilter}
          onClear={() => props.onStoryFilter('')}
          onChange={(text) => props.onStoryFilter(text)}
        />
      )
    }
      {
        props.stories ? (
        <Stories {...pick(props, storyProps)} />
        ) : null
      }
  </div>
)

export default LeftPanel
