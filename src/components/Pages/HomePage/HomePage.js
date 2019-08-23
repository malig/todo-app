import React from 'react';
import {withAuthorization} from '../../Session';
import {List} from '../../List';

const HomePage = () => <List />;

export default withAuthorization(HomePage);