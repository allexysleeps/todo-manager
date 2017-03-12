import React from 'react';

import TaskTableHeader from './TaskTableHeader';
import TaskItem from './TaskItem';



export default class TasksTable extends React.Component {
	constructor() {
		super()
		this.state = {
			showMoreContent: false
		}
	}

	_toggleShowMore(e, text) {
		this.setState({
			showMoreContent: text
		})
	}

	render() {
		const { data } = this.props;
		return(
			<div className="page-wrapper">
				<div className="task-table">
					<TaskTableHeader />
					{
						data ? 
							data.map((item, index)=> {
								return (
									<TaskItem
										key={index}
										data={item}
										toggleShowMore={this._toggleShowMore.bind(this)}/>
								)
							}) : ''
					}
				</div>
				{
					this.state.showMoreContent ? 
						<div className="modal-more">
							{this.state.showMoreContent}
						</div> : ''
				}
			</div>
		)
	}
}