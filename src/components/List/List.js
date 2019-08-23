import React, {Component} from 'react';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {withRouter} from 'react-router-dom';
import {Input, Btn, Well} from '../common';
import {trigger} from '../../utils';

import './List.css';

class List extends Component {
    state = {
        caption: '',
        error: null,
        list: {}
    };

    componentDidMount() {
        this.props.firebase.onChangeList(list => this.setState({list}));
    }

    componentWillUnmount() {
        this.props.firebase.offChangeList();
    }

    onSubmit = e => {
        const caption = this.state.caption;
        caption && this.props.firebase.createList(caption, () => this.setState({caption: ''}), error => this.setState({error}));

        e.preventDefault();
    };

    onChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    goToEditPage = id => {
        this.props.history.push('/' + id);
    };

    renderList = () => {
        const {list} = this.state;
        const temp = [];

        for (let key in list) {
            list.hasOwnProperty(key) && temp.push(<Item key = {key} id = {key} onClick = {this.goToEditPage} value = {list[key]} />);
        }

        return temp;
    };

    render() {
        const {caption, error} = this.state;

        return (
            <div className={'list'}>
                <form onSubmit = {this.onSubmit} className={'list__tools'}>
                    <Input
                        className={'list__caption-input'}
                        name = 'caption'
                        value = {caption}
                        onChange = {this.onChange}
                        type = 'text'
                        placeholder = 'Enter todo list caption'
                    />

                    <Btn type = 'submit' className={'list__create-btn'}>
                        {'Create'}
                    </Btn>

                    {error && <p>{error.message}</p>}
                </form>

                <div className={'list__content'}>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

class Item extends Component {
    onClick = () => {
        trigger.call(this, 'onClick', this.props.id);
    };

    render() {
        return (
            <Well className={'list__item'}>
                <span className={'list__caption'}>{this.props.value}</span>
                <Btn className={'list__goto-btn'} onClick = {this.onClick}>{'Details'}</Btn>
            </Well>
        );
    }
}

export default compose(
    withRouter,
    withFirebase,
)(List);