import React from 'react';

import TasksTable from './TasksTable';
import AddTask from './AddTask';

export default class TaskManagerContent extends React.Component {
	constructor() {
		super()
		this.state = {
			addModuleStatus: false
		}
	}

	_toggleAddTaskModal(e, status) {
		this.setState({
			addModuleStatus: status
		})
	}

	render() {
		return(
			<div className="page-wrapper">
				<TasksTable data = {this.props.data}/>
				<div className="button-add" onClick={(e)=>{this._toggleAddTaskModal(e, true)}}>
					add task
				</div>
				{
					this.state.addModuleStatus
						? <AddTask toggleModal={this._toggleAddTaskModal.bind(this)}/>
						: '' 
				}
			</div>
		)
	}
}