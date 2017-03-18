import { EventEmitter } from 'events';
import dispatcher from './../Dispatcher';

import axios from 'axios';

class Store extends EventEmitter {
	constructor() {
		super();
		this.user_id = undefined;
		this.tasks = undefined;
	}

	_setUserId(user_id) {
		this.user_id = user_id;
		this._getServerData();
	}

	_getStoreData() {
		if(this.user_id) {
			return this.tasks;
		} else {
			return undefined;
		}
	}
	
	_updateTask(editingData) {
		
		let { e, data, field, isStatus } = editingData;

		let changedData = isStatus 
			? e.target.value 
			: e.target.parentElement.parentElement.parentElement.getElementsByTagName('textarea')[0].value;

		let newData = {
			timestamp: data.timestamp,
			title: data.title,
			description: data.description,
			status: data.status,
			user_id: 1
		}
		
		newData[field] = changedData;
		
		axios.put(`/${this.user_id}/${data.timestamp}`, newData)
			.then((res)=> {
				this._getServerData();
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	_createTask(data) {
		console.log(data);
		axios.post(`/${this.user_id}`, data)
			.then((res)=> {
				this._getServerData();
				console.log('task added, response:', res);
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	_deleteTask(data) {
		axios.delete((`/${this.user_id}/${data}`))
			.then((res)=> {
				this._getServerData();
				console.log('delete succeed, response:', res);
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	_getServerData() {
		axios.get(`/${this.user_id}`)
			.then((res)=>{
				this.tasks = res.data;
				this.emit('change');
				console.log(this.tasks);
			})
			.catch((err)=>{
				console.log(err);
			})
	}

	_handleActions(action) {
		switch (action.type) {
			case 'UPDATE_TASK': {
				this._updateTask(action.data);
				break;
			}
			case 'CREATE_TASK': {
				this._createTask(action.data);
				break;
			}
			case 'DELETE_TASK': {
				this._deleteTask(action.data);
				break;
			}
		}
	}


}

const TaskStore = new Store;

dispatcher.register(TaskStore._handleActions.bind(TaskStore));

export default TaskStore;