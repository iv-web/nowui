import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import Dialog from '../src/index.js'

function onEnter () { alert('enter') }
function onCancel () { alert('cancel')}

export const Dialog1 = () => (
  <div>
      完整展示
      <Dialog text="hello world" title="react" onEnter={onEnter} onCancel={onCancel} />
  </div>
)

export const Dialog2 = () => (
  <div>
      不包含text
      <Dialog title="no title" onEnter={onEnter} onCancel={onCancel} />
  </div>
)

export const Dialog3 = () => (
  <div>
      不包含title
      <Dialog text="text" onEnter={onEnter} onCancel={onCancel} />
  </div>
)


sandboxStore.add('dialog1', Dialog1)
  .add('dialog2', Dialog2)
  .add('dialog3', Dialog3)
