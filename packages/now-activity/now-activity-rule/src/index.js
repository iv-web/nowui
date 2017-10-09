import React from 'react';

import '../assets/index.scss';

export default class Rule extends React.Component {

    constructor() {
        super(...arguments);
    }

    render() {

        const { title, ruleList } = this.props;

        return (
            <div className="rule">
                <h3>{ title }</h3>
                <div className="content">
                    {Array.isArray(ruleList) &&　ruleList.map((item, index) => {
                        return (<div key={`rule-item-${index}`}
                                     className="rule-item">
                            <div className="sub-title">{ item.subTitle }</div>
                            <div className="sub-content">{ item.subContent }</div>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
