import './assets/preview.scss'

import React from 'react'

export default class Preview extends React.Component {
  constructor(globalState, storyStore) {
    super()

    this.state = {}
    this.globalState = globalState
    this.storyStore = storyStore
    this.globalState.on('change', (kind, story) => {
      if (this.mounted) {
        this.setState({
          kind,
          story,
        })
      } else {
        this.state = {
          ...this.state,
          kind,
          story,
        }
      }
    })
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted =false
  }

  render() {
    const { kind, story } = this.state
    const storyPanel = this.storyStore.getStory(kind, story)()

    return (
      <div className="nd-preview-main">
        <div className="nd-preview-header">
            <span className="nd-preview-kind">
                {kind}
            </span>
            <span className="nd-preview-story">
                {story}
            </span>
        </div>
        {storyPanel}
      </div>
    )
  }
}
