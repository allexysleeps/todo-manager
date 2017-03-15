import React from 'react';

import TaskStore from './../Stores/Store';

export default class TaskItemTextField extends React.Component {
	constructor() {
		super();
		
	}

	render() {
		const { data, type } = this.props;

		return(
			<div className={`task-${type}`}>
				<span>{data[type]}</span>
				<div className="tools">
					<span className="tool-edit" onClick={(e)=>{this.props.toggleEditor(e, data[type], data, type)}}>edit</span>
					<span className="tool-more" onClick={(e)=>{this.props.toggleShowMore(e, data[type])}}>more</span>
				</div>
			</div>
		)
	}
}