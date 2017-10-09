import React, { Component } from 'react';
import '../assets/layout.scss';

export class Flex extends Component {
    static flexMap = {
        justify: {
            'start': 'flex-start',
            'end': 'flex-end',
            'center': 'center',
            'between': 'space-between',
            'around': 'space-around'
        },
        align: {
            'start': 'flex-start',
            'end': 'flex-end',
            'center': 'center',
            'baseline': 'baseline',
            'stretch': 'stretch'
        }
    }

    proxyProp(props) {
        props.justify = Flex.flexMap.justify[props.justify] || `flex-${props.justify}`;
        props.align = Flex.flexMap.justify[props.align] || `flex-${props.align}`;
        return props;
    }

    render() {
        let {
            children,
            direction,
            wrap,
            justify,
            align
        } = this.proxyProp(Object.assign({},this.props));

        return (
            <div className="now-base-layout-flex-ctn" style={{
                'flexDirection': direction,
                'flexWrap': wrap,
                'justifyContent': justify,
                'alignItems': align
            }} >{children}</div>
        )
    }
}

export class FlexItem extends Component {
    render() {
        let { children,style,className } = this.props;
        return (
            <div className={className} style={style}>{children}</div>
        )
    }
}