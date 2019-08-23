import React, {Component} from 'react';
import {Well, Textarea} from '../common';
import {trigger} from '../../utils';

import './Task.css';

class TaskMerge extends Component {
    choice = {
        my: '',
        their: ''
    };

    onCheckMy = e => {
        this.choice.my = e.target.checked ? this.props.value : '';

        this.triggerOnChoice();
    };

    onCheckTheir = e => {
        this.choice.their = e.target.checked ? this.props.modified : '';

        this.triggerOnChoice();
    };

    triggerOnChoice = () => {
        const {my, their} = this.choice;

        trigger.call(this, 'onChoice', {
            id: this.props.id,
            task: `${my} ${their}`
        });
    };

    render() {
        const {value, modified} = this.props;
        return (
            <Well className={'task'}>
                <div className={'task__two-col'}>
                    <input type = 'checkbox' onChange = {this.onCheckMy} />

                    <span>{'My'}</span>

                    <Textarea className={'task__input'} value = {value} disabled/>
                </div>

                <div className={'task__two-col'}>
                    <input type = 'checkbox' onChange = {this.onCheckTheir} />

                    <span>{'Their'}</span>

                    <Textarea className={'task__input'} value = {modified} disabled/>
                </div>
            </Well>
        );
    }
}

export default TaskMerge;