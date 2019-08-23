import React from 'react';
import {withFirebase} from '../Firebase';
import {Btn} from '../common';

const LogoutBtn = ({firebase, className}) => (
	<Btn className={className} onClick = {firebase.logOut}>
		{'Log out'}
	</Btn>
);

export default withFirebase(LogoutBtn);
