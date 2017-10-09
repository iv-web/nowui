import './assets/preview.scss'
import React, { Component } from 'react'
import AraleQRCode from 'arale-qrcode'
import url from 'url'

const domanPath = 'https://ivweb.io/now-design/doc/';

class Preview extends Component {
  render() {
    const {
      width = 405,
      height = 620,
      name,
      anchers
    } = this.props

    const src = `iframe.html?name=${name}`

    const qrcodeCanvas = new AraleQRCode({
        text: url.resolve(domanPath, src),
        size: 256
      })
    const qrcodeSrc = qrcodeCanvas.toDataURL('image/png')

    return (
      <div className="nd-m-preview">
        <h2 className="anchor" id={anchers[0]}>{anchers[0]}</h2>
        <div
          className="nd-m-preview-wrap"
          style={{ width }}
        >
          <div className="nd-mock-phone-head">
              <div className="nd-mock-url">
                  { src }
              </div>
          </div>
          <iframe style={{
            width,
            height,
            display: 'block',
            border: 0
          }} src={src} onLoad={this.onIframeLoad}/>
        </div>
        <h2 className="anchor" id={anchers[1]}>{anchers[1]}</h2>
        <div className="nd-mock-qr-code">
          <img style={{
            width: '256px'
          }} src={qrcodeSrc} alt={name} />
          <p>扫描二维码，查看 {name} 手机预览</p>
        </div>
      </div>
    )
  }
}

export default Preview
