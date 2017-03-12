import React from 'react';
import Isvg from 'react-inlinesvg';

import TaskTableHeader from './TaskTableHeader';
import TaskItem from './TaskItem';

export default class TasksTable extends React.Component {
	constructor() {
		super()
		this.state = {
			showMoreContent: false,
			editorContent: false,
			editorType: false
		}
	}

	_toggleShowMore(e, text) {
		this.setState({
			showMoreContent: text
		})
	}
	_toggleEditor(e, text) {
		this.setState({
			editorContent: text
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
										toggleShowMore={this._toggleShowMore.bind(this)}
										toggleEditor={this._toggleEditor.bind(this)}/>
								)
							}) : ''
					}
				</div>
				{
					this.state.showMoreContent ? 
						<div className="modal-more">
							<p className="modal-more-content">
								{this.state.showMoreContent}
							</p>
							<div className="cross" onClick={(e)=>{this._toggleShowMore(e, false)}}>
								<Isvg src="../imgs/cross-icon.svg" ></Isvg>
							</div>
						</div> : ''
				}
				{
					this.state.editorContent ?
						<div className='modal-edit'>
							<input type='texarea' defaultValue={this.state.editorContent} />
							<div className="cross" >
								<Isvg src="../imgs/cross-icon.svg" ></Isvg>
							</div>
						</div> : ''
				}
			</div>
		)
	}
}