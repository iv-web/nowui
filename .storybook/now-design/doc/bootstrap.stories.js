import React, { Component } from 'react'
import MarkdownPreview from '@now-design/sandbox/markdownPreview'
import { storiesOf, action } from '@now-design/manager'
import ReadMe from './README.md'
import RULES from './RULES.md'
import CONTRIBUTION from './CONTRIBUTION.md'
import CONSTRUCT from './CONSTRUCT.md'
import INSTALL from './INSTALL.md'
import NOWDESIGN from './NOWDESIGN.md'

storiesOf('NowUI', module, {
  index: -999
})
.add("what's NowUI", () => (
    <MarkdownPreview className="markdown-body"  value={NOWDESIGN} key="what's NowUI" />
))
// .add("快速开始", () => (
//     <MarkdownPreview className="markdown-body"  value={ReadMe} key="快速开始" />
// ))
.add("安装与使用", () => (
    <MarkdownPreview className="markdown-body"  value={INSTALL} key="安装与使用" />
))

