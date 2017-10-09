import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import {List,ListItem} from '../src/index.js'
import '../assets/index.scss';

export default class ListWraper extends Component {
    render() {
        return (
            <div className='container'>
                 <List>
                     <ListItem>1</ListItem>
                     <ListItem>2</ListItem>
                     <ListItem>3</ListItem>
                     <ListItem>4</ListItem>
                 </List>
            </div>
        )
    }
}
sandboxStore.add('lists', ListWraper);


