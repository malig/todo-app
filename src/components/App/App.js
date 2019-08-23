import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {withAuthentication} from '../Session';
import {AUTH, HOME, REGISTRATION, TASKS} from '../../constants/routes';
import {AuthPage, HomePage, RegistrationPage, TasksPage} from '../Pages';
import {LogoutBtn} from '../Auth';

import './app.css';

const App = () => (
  <div className={'app'}>
      <div className={'app__header'}>
          <h1 className={'app__title'}>{'TODO List Application'}</h1>

          <LogoutBtn  className={'app__logout-btn'}/>
      </div>

      <div className={'app__content'}>
          <Router>
              <Route exact path = {AUTH} component = {AuthPage} />
              <Route exact path = {HOME} component = {HomePage} />
              <Route exact path = {REGISTRATION} component = {RegistrationPage} />
              <Route exact path = {TASKS} component = {TasksPage} />
          </Router>
      </div>
  </div>
);

export default withAuthentication(App);