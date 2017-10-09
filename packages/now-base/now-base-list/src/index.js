import React, { Component } from 'react';
import "../assets/list.scss";

export class List extends Component{
    render(){
        let {children} = this.props;
        return (
            <div className="now-base-list-cont">
                {children}
            </div>
        )
    }
}
export class ListItem extends Component{
    render(){
        let {children,className,style,onClick} = this.props;
        return (
            <div className={`now-base-list-item ${className}`} style={style} onClick={onClick}>
                {children}
            </div>
        )
    }
}