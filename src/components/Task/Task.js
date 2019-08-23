import React, {Component} from 'react';
import {Well, Textarea} from '../common';
import {trigger} from '../../utils';

import './Task.css';

class Task extends Component {
    onChange = e => {
        trigger.call(this, 'onChange', {
            id: this.props.id,
            value: e.target.value
        });
    };

    render() {
        return (
            <Well className={'task'}>
                <Textarea className={'task__input'} value = {this.props.value} onChange = {this.onChange} />
            </Well>
        );
    }
}

export default Task;