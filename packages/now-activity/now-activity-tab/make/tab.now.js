import {
    sandboxStore
} from '@now-design/sandbox'
import React, {
    Component
} from 'react'
import Tab from '../src/index.js'

const tabs = ['女神榜', '男神榜', '新人榜', '潜力榜'];

export default class TabWrapper extends Component {

    state = {
        selectedTabIndex: 0,
        word:'女神榜',
    }

    tabClick = (tabIndex, item) => {
        this.setState({
            word: item
        });
    }

    render() {
        const {
            selectedTabIndex,
            word
        } = this.state

        return (
            <div>
                选项卡组件
                <Tab
                    callback={this.tabClick}
                    defaultSelectIndex={selectedTabIndex}
                    tabsData={tabs}
                />
                {word}
            </div>
        )
    }
}

sandboxStore.add('activity-Tab', TabWrapper);