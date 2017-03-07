import React from 'react';
import TaskItem from './TaskItem';

const arr = [
		{
			"timestamp": "1488882475446",
			"title": "test task updated",
			"description": "lorem lorem lorasdasdaem impsum shnipsum",
			"status": "in progress",
			"user_id": 1
		},
		{
			"timestamp": "1488882475447",
			"title": "test task updated2",
			"description": "lorem lorem lorasdasdaem impsum shnipsum",
			"status": "in progress",
			"user_id": 1
		}
	]

export default class TasksTable extends React.Component {
	constructor() {
		super()
	}

	render() {
		return(
			<div className="page-wrapper">
				<div className="task-table">
					{
						arr.map((item, index)=> {
							return (
								<TaskItem
									key={index}
									data={item}/>
							)
						})
					}
				</div>
			</div>
		)
	}
}