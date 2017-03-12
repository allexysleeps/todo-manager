import React from 'react';

export default class TaskTableHeader extends React.Component {

	render() {
		return(
			<div className="task-table-header">
				<span className="time-created">Date created</span>
				<span className="task-title">Title</span>
				<span className="task-description">Desription</span>
				<span className="task-status">Status</span>
			</div>
		)
	}
}