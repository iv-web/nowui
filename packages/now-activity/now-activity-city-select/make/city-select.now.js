import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import CitySelect  from '../src/index.js'

export default class CitySelectWrapper extends Component {
  state = {
    show: true
  }

  toggle = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const {
      show
    } = this.state

    const buttonStyle = {
      margin: 10
    };

    return (
      <div>
        三种大小
        <div>
            <CitySelect onCityClick={(item) => {alert(item)}}/>
        </div>
      </div>
    )
  }
}

sandboxStore.add('activity-city-select', CitySelectWrapper);
