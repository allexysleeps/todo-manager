import React from 'react';
import axios from 'axios';
import TaskStore from '../Stores/Store';

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
				<div className="task-title" title={title}>
					<span>{title}</span>
					<div className="tools">
						<span className="tool-edit" onClick={(e)=>{this.props.toggleEditor(e, title, this.props.data, 'title')}}>edit</span>
						<span className="tool-more" onClick={(e)=>{this.props.toggleShowMore(e, title)}}>more</span>
					</div>
				</div>
				<div className="task-description">
					<span className="text">{description}</span>
					<div className="tools">
						<span className="tool-edit">edit</span>
						<span className="tool-more" onClick={(e)=>{this.props.toggleShowMore(e, description)}}>more</span>
					</div>
				</div>
				<select onChange={(e)=>{TaskStore._updateTask(e, this.props.data, true)}} 
						className="task-status"
						type='select'
						defaultValue={status} >
					<option value="New">New</option>
					<option value="In progress">In progress</option>
					<option value="Done">Done</option>
				</select>
			</div>
		)
	}
}