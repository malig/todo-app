import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {HOME} from '../../constants/routes';
import {Input, Well, Btn} from '../../components/common';

import './Registration.css';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class Registration extends Component {
    state = {...INITIAL_STATE};

    onSubmit = e => {
        const {username, email, passwordOne} = this.state;
        const {firebase, history} = this.props;

        firebase
            .createUser(email, passwordOne)
            .then(authUser => {        
                firebase
                    .user(authUser.user.uid)
                    .set({username, email})
                    .then(() => {
                        this.setState({...INITIAL_STATE});
                        history.push(HOME);
                    })
                    .catch(error => this.setState({error}));
            })
            .catch(error => this.setState({error}));

        e.preventDefault();
    };

    onChange = e => {
        const {name, value} = e.target;

        this.setState({[name]: value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        return (
            <Well className={'registration'}>
                <form onSubmit = {this.onSubmit}>
                    <Input
                        className = {'registration_step'}
                        name = 'username'
                        value = {username}
                        onChange = {this.onChange}
                        type = 'text'
                        placeholder = 'Name'
                    />

                    <Input
                        className = {'registration_step'}
                        name = 'email'
                        value = {email}
                        onChange = {this.onChange}
                        type = 'text'
                        placeholder = 'Email address'
                    />

                    <Input
                        className = {'registration_step'}
                        name = 'passwordOne'
                        value = {passwordOne}
                        onChange = {this.onChange}
                        type = 'password'
                        placeholder = 'Password'
                    />

                    <Input
                        className = {'registration_step'}
                        name = 'passwordTwo'
                        value = {passwordTwo}
                        onChange = {this.onChange}
                        type = 'password'
                        placeholder = 'Confirm password'
                    />

                    <Btn type = 'submit'>{'Sign Up'}</Btn>

                    {error && <p>{error.message}</p>}
                </form>
            </Well>
        );
    }
}

export default withRouter(withFirebase(Registration));