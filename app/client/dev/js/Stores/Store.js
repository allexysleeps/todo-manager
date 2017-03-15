import { EventEmitter } from 'events';
import dispatcher from './../Dispatcher';

import axios from 'axios';

class Store extends EventEmitter {
	constructor() {
		super();
		this.tasks = undefined;
	}

	_getStoreData() {
		return this.tasks
	}
	
	_updateTask(e, data, field, isStatus) {
		
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
		
		switch(field) {
			case 'status': {
				newData.status = changedData;
				break;
			}
			case 'title': {
				newData.title = changedData;
				break;
			}
		}
		
		axios.put(`/1/${data.timestamp}`, newData)
			.then((res)=> {
				this.emit('change');
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


}

const taskStore = new Store;

// dispatcher.register()

export default taskStore;