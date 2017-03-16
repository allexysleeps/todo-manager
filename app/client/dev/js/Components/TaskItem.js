import React from 'react';
import axios from 'axios';

import * as TaskActions from './../Actions/Actions';

import TaskItemTextField from './TaskItemTextField';

export default class TaskItem extends React.Component {
	constructor() {
		super()
		this.state = {
			
		}
	}

	render() {
		const { timestamp, title, description, status } = this.props.data;
		let taskDate = new Date(Number(timestamp));
		let shortenDate = `${taskDate.getMonth()}/${taskDate.getDay()}/${taskDate.getFullYear()}`;
		return(
			<div className='task-item'>
				<span className="time-created">{shortenDate}</span>
				<TaskItemTextField 
					type='title'
					data={this.props.data}
					toggleEditor={this.props.toggleEditor}
					toggleShowMore={this.props.toggleShowMore}/>
				<TaskItemTextField
					type='description'
					data={this.props.data}
					toggleEditor={this.props.toggleEditor}
					toggleShowMore={this.props.toggleShowMore}/>
				<select onChange={(e)=>{TaskActions._updateTask(e, this.props.data, 'status', true)}} 
						className="task-status"
						type='select'
						value={status} >
					<option value="New">New</option>
					<option value="In progress">In progress</option>
					<option value="Done">Done</option>
				</select>
			</div>
		)
	}
}