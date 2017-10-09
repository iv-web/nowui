import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import '../assets/index.scss';
import {Flex,FlexItem} from '../src'


export default class LayoutWraper extends Component {
    render() {
        return (
            <div style={{width:'100%',color:'#484848'}}>
                <h3>默认布局</h3>
                <Flex>
                    <FlexItem className='item'>demo</FlexItem>
                    <FlexItem className='item'>demo</FlexItem>
                    <FlexItem className='item'>demo</FlexItem>
                    <FlexItem className='item'>demo</FlexItem>
                </Flex>
                <h3>水平布局 justify-between</h3>
                <Flex justify='between'>
                    <FlexItem className='item' style={{flex:0,'flex-basis':'100px'}}>demo</FlexItem>
                    <FlexItem className='item' style={{flex:0,'flex-basis':'100px'}}>demo</FlexItem>
                    <FlexItem className='item' style={{flex:0,'flex-basis':'100px'}}>demo</FlexItem>
                    <FlexItem className='item' style={{flex:0,'flex-basis':'100px'}}>demo</FlexItem>
                </Flex>
            </div>

        )
    }
}
sandboxStore.add('layouts', LayoutWraper);


