import React from 'react';
import { data } from './data';

import '../assets/index.scss';

export default class CitySelect extends React.Component {

    onCityIndexClick(item) {
        const letter = item;

        const cityListRef = this.refs[letter];

        const cityOffsetTop = cityListRef.offsetTop;
        document.getElementById('cityContaner').parentElement.scrollTop = cityOffsetTop;
    }

    /**
     * 渲染热门城市区域
     */
    renderHotCities(hotCities) {
        return (<div className="hot-cities">
            <h3 className="ct-title">热门城市</h3>
            <ul className="ct-list">
                {
                    hotCities.map((item, index) => {
                        return (
                            <li key={item + index} onClick={this.onCityClick.bind(this, item)}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>);
    }

    /**
     * 选择城市索引区域
     * @returns {XML}
     */
    renderCityIndex(cityIndex) {
        return (<div className="ct-index">
            <h3 className="ct-title test">更多城市</h3>
            {
                cityIndex.map((item, index) => {
                    return (
                        <span key={item + index} onClick={this.onCityIndexClick.bind(this, item)}>{item}</span>
                    )
                })
            }
        </div>)
    }

    onCityClick(name) {
        const { onCityClick } = this.props;
        onCityClick && onCityClick(name);
    }

    keys(obj) {
        const keys = [];

        for (let key in obj) {
            keys.push(key);
        }
        return keys;
    }

    values(obj) {
        const values = [];

        for (let key in obj) {
            values.push(obj[key]);
        }
        return values;
    }



    /**
     * 渲染所有城市数据
     */
    renderAllCities(cityData) {
        const keys = this.keys(cityData);
        const values = this.values(cityData);

        return (<div className="city-data">
            {
                values.map((cityList, key) => {
                    return (<div className="ct-list" key={'cityList' + key}>
                        <h3 ref={keys[key]} className="ct-title">{keys[key]}</h3>
                        {
                            cityList.map((cityItem, itemKey) => {
                                return (
                                    <li key={cityItem + itemKey} onClick={this.onCityClick.bind(this, cityItem)}>{cityItem}</li>
                                );
                            })
                        }
                    </div>);
                })
            }
        </div>);
    }

    render() {
        const { hotCities, cityIndex, cityData } = data;

        return (<div id="cityContaner">
            {this.renderHotCities(hotCities)}
            {this.renderCityIndex(cityIndex)}
            {this.renderAllCities(cityData)}
        </div>);
    }
}
