import React from 'react';
import Isvg from 'react-inlinesvg';
import axios from 'axios';

import TaskStore from '../Stores/Store';

import TaskTableHeader from './TaskTableHeader';
import TaskItem from './TaskItem';
import ModalEdit from './ModalEdit';

export default class TasksTable extends React.Component {
	constructor() {
		super()
		this.state = {
			showMoreContent: false,
			editorContent: false,
			editingData: '',
			editingField: ''
		}
	}

	_toggleShowMore(e, text) {
		this.setState({
			showMoreContent: text
		})
	}
	_toggleEditor(e, text, data, field) {
		this.setState({
			editorContent: text,
			editingData: data,
			editingField: field
		})
	}

	render() {
		const { data } = this.props;
		return(
			<div className="page-wrapper">
				<div className="task-table">
					<TaskTableHeader />
					{
						data
							? data.map((item, index)=> {
								return (
									<TaskItem
										key={index}
										data={item}
										toggleShowMore={this._toggleShowMore.bind(this)}
										toggleEditor={this._toggleEditor.bind(this)}/>
								)
							}) 
							: ''
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
					this.state.editorContent 
						? <ModalEdit 
							currentValue={this.state.editorContent} 
							editingField={this.state.editingField}
							editingData={this.state.editingData} 
							toggleEditor={this._toggleEditor.bind(this)}/> 
						: ''
				}
			</div>
		)
	}
}