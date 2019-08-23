import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {AUTH} from '../../constants/routes';
import AuthUserContext from './context';

const condition = authUser => !!authUser;

const withAuthorization = Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            const {firebase, history} = this.props;

            this.listener = firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        history.push(AUTH);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => condition(authUser) ? <Component {...this.props} /> : null}
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};

export default withAuthorization;
