import React from 'react';
import {withAuthorization} from '../../Session';
import {Tasks} from '../../Tasks';

const TasksPage = ({location}) => <Tasks id = {location.pathname.replace('/', '')} />;

export default withAuthorization(TasksPage);