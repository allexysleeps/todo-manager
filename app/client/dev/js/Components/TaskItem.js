import React from 'react';
import axios from 'axios';

export default class TaskItem extends React.Component {
	constructor() {
	super()

	this._updateTask = this._updateTask.bind(this);
	}
	_updateTask(e, field) {
		let changedData = e.target.value;
		let newData = {
			timestamp: this.props.data.timestamp,
			title: this.props.data.title,
			description: this.props.data.description,
			status: this.props.data.status,
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

		axios.put(`/1/${this.props.data.timestamp}`, newData)
			.then((res)=> {
				console.log(res);
			})
			.catch((err)=> {
				console.log(err);
			})
	}

	render() {
		
		const { timestamp, title, description, status } = this.props.data;
		let taskDate = new Date(Number(timestamp));
		let shortenDate = `${taskDate.getMonth()}/${taskDate.getDay()}/${taskDate.getFullYear()}`;
		return(
			<div className='task-item'>
				<span className="time-created">{shortenDate}</span>
				<span className="task-title">{title}</span>
				<span className='task-description'>{description}</span>
				<select onChange={(e)=>{this._updateTask(e, 'status')}} className="task-status" type='select' defaultValue={status} >
					<option value="New">New</option>
					<option value="In progress">In progress</option>
					<option value="Done">Done</option>
				</select>
			</div>
		)
	}
}