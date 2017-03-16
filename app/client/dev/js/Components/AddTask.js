import React from 'react';

import * as TaskActions from './../Actions/Actions';

export default class AddTask extends React.Component {
	constructor() {
		super();
		this.state = {
			modalStatus: false
		}

	}

	_submitModal(e) {
		e.preventDefault();
		TaskActions._createTask({
			timetamp: Date.now(),
			title: e.target.elements[0].value,
			description: e.target.elements[1].value,
			status: 'New'
		});
		this.props.toggleModal(e, false);
	}

	render() {
		console.log(TaskActions);
		return(
			<div className="modal-add">
				<h3>Add new task</h3>
				<form onSubmit={(e)=>{this._submitModal(e)}}>
					<input type="text" placeholder="Enter task title" required />
					<textarea placeholder="Specify task desctiption"/>
					<input type="submit" />
				</form>
			</div>
		)
	}
}