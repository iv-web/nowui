import React from 'react'
import Preview from './preview'
import { EventEmitter } from 'events'
import { Provider } from 'now-design-ui'

export default class ReactProvider extends Provider {
  constructor(clientApi) {
    super()
    this.clientApi = clientApi
    this.storyStore = clientApi._storyStore

    /* 用于给 preview 发送事件 */
    this.globalState = new EventEmitter()
  }

  getPanels() {
    return {}
  }

  // You must implement this public API.
  renderPreview(selectedKind, selectedStory) {
    // We need to do this here to avoid memory leaks in the globalState.
    // That's because renderPreview can be called multiple times.
    this._handlePreviewEvents()

    // create preview React component.
    const preview = new Preview(this.globalState, this.storyStore)
    this.globalState.emit('change', selectedKind, selectedStory)
    return preview
  }

  // You must implement this public API.
  handleAPI(api) {
    this.api = api
    this.api.setOptions({
      name : 'REACT-STORYBOOK',
    })
    // set stories
    this.api.setStories(this.clientApi.getStorybook())

    // 监听left panel 的点击事件，通知 preview 改变 render 的 compoent 
    // listen to the story change and update the preview.
    this.api.onStory((kind, story) => {
      this.globalState.emit('change', kind, story)
    })
  }

  _handlePreviewEvents() {
    this.globalState.removeAllListeners()
  }
}
