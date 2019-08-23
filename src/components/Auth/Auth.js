import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {HOME, REGISTRATION} from '../../constants/routes';
import {Well, Input, Btn} from '../common';

import './Auth.css';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Auth extends Component {
    state = {...INITIAL_STATE};

    onSubmit = e => {
        const {email, password} = this.state;
        const {firebase, history} = this.props;

        firebase
            .logIn(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                history.push(HOME);
            })
            .catch(error => this.setState({error}));

        e.preventDefault();
    };

    onChange = e => {
        const {name, value} = e.target;

        this.setState({[name]: value});
    };

    render() {
        const {email, password, error} = this.state;

        return (
            <Well className = {'auth'}>
                <form onSubmit = {this.onSubmit}>
                    <Input
                        className = {'auth_step'}
                        name = 'email'
                        value = {email}
                        onChange = {this.onChange}
                        type = 'text'
                        placeholder = 'Email Address'
                    />

                    <Input
                        className = {'auth_step'}
                        name = 'password'
                        value = {password}
                        onChange = {this.onChange}
                        type = 'password'
                        placeholder = 'Password'
                    />

                    <div className = {'auth__two-col'}>
                        <Btn type = 'submit'>{'Log In'}</Btn>
                    </div>

                    <div className = {'auth__two-col auth__two-col_align_right'}>
                        <Link className = {'auth__registration-link'} to = {REGISTRATION}>{'Registration'}</Link>
                    </div>

                    {error && <p>{error.message}</p>}
                </form>
            </Well>
        );
    }
}

export default compose(
    withRouter,
    withFirebase,
)(Auth);