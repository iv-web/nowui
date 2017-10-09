import './assets/reset.scss'
import './assets/markdown.scss'
import Path from 'path'
import React from 'react'
import ReactDOM from 'react-dom'
import renderStorybookUI from 'now-design-ui'
import Provider from './provider'
import StoryStore from './story_store'
import ClientApi from './client_api'

const storyStore = new StoryStore()
const clientApi = new ClientApi({
  storyStore
})

export const storiesOf = clientApi.storiesOf.bind(clientApi)
export const setAddon = clientApi.setAddon.bind(clientApi)
export const addDecorator = clientApi.addDecorator.bind(clientApi)
export const clearDecorators = clientApi.clearDecorators.bind(clientApi)
export const getStorybook = clientApi.getStorybook.bind(clientApi)

const req = require.context('../../../packages/', true, /.stories.js$/)
req.keys().forEach((filename) => req(filename))
require('../doc/bootstrap.stories.js')

const rootEl = document.getElementById('root')
export default renderStorybookUI(rootEl, new Provider(clientApi))




