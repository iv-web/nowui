import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import '../assets/index.scss';
import {Topic,TopicItem} from '../src'


export default class TopicWraper extends Component {
    render() {
        return (
                <Topic>
                    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
                    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
                    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
                    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
                </Topic>
        )
    }
}
sandboxStore.add('topics', TopicWraper);


