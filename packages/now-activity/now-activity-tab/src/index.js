import React, {
    Component
} from 'react';
import className from 'classnames';

import '../assets/index.scss';

export default class Tab extends Component {
    
    constructor(props, context) {
        super(...arguments);
        this.state = {
            selectedTabIndex: props.defaultSelectIndex || 0,
            currTabText: props.tabsData[props.defaultSelectIndex],
            tabs: props.tabsData
        }
    }

    componentDidMount() {
        this.setState({
            selectedTabIndex: this.props.defaultSelectIndex
        });
    }

    onTabClick(tabIndex, item) {
        const {
            callback
        } = this.props;
        this.setState({
            selectedTabIndex: tabIndex,
            currTabText: item
        });
        callback && callback(tabIndex, item);
    }

    getActiveTabStyle = () => {
        const domActiveCategory = this[`domTabs${this.state.currTabText}`];
        if(!domActiveCategory) {
            return {
                display: 'none'
            };
        }

        const left = domActiveCategory.offsetLeft;
        const top = domActiveCategory.offsetTop;
        const width = domActiveCategory.offsetWidth;
        
        const transformValue = `translate3d(${left}px, ${top}px, 0)`;
        
        return {
            width: `${width}px`,
            display: 'block',
            transform: transformValue,
            WebkitTransform: transformValue
        }
    }

    getStaticTabStyle = () => {
        const domActiveCategory = this[`domTabs${this.state.currTabText}`];
        if(!domActiveCategory) {
            return {
                display: 'none'
            };
        }

        const top = domActiveCategory.offsetTop;
        const transformValue = `translate3d(${28}px, ${top + 3}px, 0)`;

        return {
            width: `${window.innerWidth - 56}px`,
            display: 'block',
            transform: transformValue,
            WebkitTransform: transformValue
        }
    }

    render() {
        const {
            tabs,
            selectedTabIndex
        } = this.state;

        let activeName = '';
        return (
            <div className={`mod-ranklist-bar tab${selectedTabIndex + 1}`}>
                {
                    tabs.map((item, index) => {
                        const tabCls = className({
                            btn: true,
                            selected: selectedTabIndex === index
                        });
                        const length = tabs.length;

                        if(selectedTabIndex === index){
                            activeName = item;
                        }
                            
                        return (
                            <div className="btn-wrap" style={{width: `${100/length}%`}} key={index} onClick={this.onTabClick.bind(this, index, item)}>
                                <div ref={(c) => {this[`domTabs${item}`] = c}} className={tabCls}>
                                    {item}
                                </div>
                            </div>
                        );
                    })
                }
                <div key="active-bg" ref={(c) => {this.tabsBg = c} } className="active-bg" style={this.getActiveTabStyle()}>
                    <div key={ activeName } className="active-word">
                    </div>
                </div>
                <div key="line-bg" className="line-bg" style={this.getStaticTabStyle()}>
                    <div key={ activeName } className="line-word">
                    </div>
                </div>
            </div>
        )
    }
}

