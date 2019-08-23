import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {Btn, Textarea} from '../common';
import {Task, TaskMerge} from '../Task';
import isEmpty from 'lodash/isEmpty';

import './Tasks.css';

class Tasks extends Component {
    state = {
        error: null,
        tasks: {},
        modified: {},
        task: '',
        needMerge: false
    };

    mergeChoice = {};

    componentDidMount() {
        const {firebase, id} = this.props;

        firebase.onChangeTasks(id, tasks => this.setState(this.splitByModified(tasks)));
    }

    componentWillUnmount() {
        const {firebase, id} = this.props;

        firebase.offChangeTasks(id);
    }

    splitByModified = (data) => {
        let {tasks, modified} = {...this.state};

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];

                if (tasks.hasOwnProperty(key) && tasks[key] !== value) {
                    modified[key] = value;
                } else {
                    tasks[key] = value;
                }
            }
        }

        return {tasks, modified};
    };

    add = () => {
        const {firebase, id} = this.props;

        firebase.addTask(id, this.state.task, () => this.setState({task: ''}), error => this.setState({error}));
    };

    update = (tasks) => {
        const {firebase, id} = this.props;

        firebase.updateTasks(id, tasks, () => {
            this.setState({
                modified: {},
                needMerge: false,
                tasks
            });

            this.mergeChoice = {};
        }, error => this.setState({error}));
    };

    onSave = () => {
        isEmpty(this.state.modified) ? this.update({...this.state.tasks}) : this.setState({needMerge: true});
    };

    onMerge = () => {
        this.update({...this.state.tasks, ...this.mergeChoice});
    };

    onEditNew = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    onEdit = ({id, value}) => {
        const {tasks} = {...this.state};

        if (tasks.hasOwnProperty(id)) {
            tasks[id] = value;
        }

        this.setState({tasks});
    };

    onChoice = ({id, task}) => {
        this.mergeChoice[id] = task;
    };

    renderTasks = () => {
        const {tasks, modified, needMerge} = this.state;
        const temp = [];

        for (let key in tasks) {
            if (tasks.hasOwnProperty(key)) {
                if (needMerge && modified.hasOwnProperty(key)) {
                    temp.push(
                        <TaskMerge
                            key = {key}
                            id = {key}
                            value = {tasks[key]}
                            modified = {modified[key]}
                            onChoice = {this.onChoice}
                        />
                    );
                } else {
                    temp.push(
                        <Task
                            key = {key}
                            id = {key}
                            value = {tasks[key]}
                            onChange = {this.onEdit}
                        />
                    );
                }
            }
        }

        return temp;
    };

    render() {
        const {task, error, needMerge} = this.state;

        return (
            <div className={'tasks'}>
                <div className={'tasks__tools'}>
                    <Textarea
                        className={'tasks__task-input'}
                        name = {'task'}
                        value = {task}
                        onChange = {this.onEditNew}
                        placeholder = 'Enter task'
                    />

                    <div className = {'tasks__btn-wrap'}>
                        <Btn className={'tasks__add-btn'} onClick={this.add}>
                            {'Add'}
                        </Btn>

                        {
                            needMerge ?
                                <Btn className={'tasks__add-btn'} onClick={this.onMerge}>
                                    {'Merge'}
                                </Btn> :
                                <Btn className={'tasks__add-btn'} onClick={this.onSave}>
                                    {'Save'}
                                </Btn>
                        }
                    </div>

                    {error && <p>{error.message}</p>}
                </div>

                <div className={'tasks__content'}>
                    {this.renderTasks()}
                </div>
            </div>
        );
    }
}

export default withFirebase(Tasks);