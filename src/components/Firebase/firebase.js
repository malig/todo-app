import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {config} from './config';
import isFunction from 'lodash/isFunction';

const LIST = 'list';
const TASKS = 'tasks';

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.db = app.database();

		this.listRef = this.db.ref(LIST);
	}

	createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	logIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	logOut = () => this.auth.signOut();

	user = uid => this.db.ref(`users/${uid}`);   	

	tasksRef = listId => this.db.ref(`${TASKS}/${listId}`);

    createList = (caption, succes, fail) => this.listRef.push(caption).then(succes).catch(fail);

    addTask = (listId, task, succes, fail) => this.tasksRef(listId).push().set(task).then(succes).catch(fail);

    updateTasks = (listId, tasks, succes, fail) => this.tasksRef(listId).update(tasks).then(succes).catch(fail);

    onChangeList = callback => this.listRef.on('value', snapshot => isFunction(callback) && callback(snapshot.val()));
    offChangeList = () => this.listRef.off('value');

    onChangeTasks = (listId, callback) => this.tasksRef(listId).on('value', snapshot => isFunction(callback) && callback(snapshot.val()));
    offChangeTasks = listId => this.tasksRef(listId).off('value');
}

export default Firebase;