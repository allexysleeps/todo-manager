import { EventEmitter } from 'events';
import dispatcher from './../Dispatcher';

import axios from 'axios';

class Store extends EventEmitter {
	constructor() {
		super();
		this.tasks = undefined;
	}

	_getStoreData() {
		console.log('data polled from the store', this.tasks);
		return this.tasks
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
		
		axios.put(`/1/${data.timestamp}`, newData)
			.then((res)=> {
				this._getServerData();
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	_createTask(data) {
		console.log(data);
		axios.post('/1', data)
			.then((res)=> {
				this._getServerData();
				console.log('task added, response:', res);
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	_deleteTask(data) {
		axios.delete((`/1/${data}`))
			.then((res)=> {
				this._getServerData();
				console.log('delete succeed, response:', res);
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	_getServerData() {
		axios.get(`/1`)
			.then((res)=>{
				this.tasks = res.data;
				this.emit('change');
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