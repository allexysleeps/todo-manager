import React from 'react';

export default class TaskItem extends React.Component {
	constructor() {
	super()
	}

	render() {
		
		const { timestamp, title, description, status } = this.props.data;
		let taskDate = new Date(Number(timestamp));
		let shortenDate = `${taskDate.getMonth()}/${taskDate.getDay()}/${taskDate.getYear()}`;
		
		return(
			<div className='task-item'>
				<span className="time-created">{shortenDate}</span>
				<span className="task-title">{title}</span>
				<span className='task-description'>{description}</span>
				<select type='select' defaultValue={status} >
					<option value="New">New</option>
					<option value="In progress">In progress</option>
					<option value="Done">Done</option>
				</select>
			</div>
		)
	}
}