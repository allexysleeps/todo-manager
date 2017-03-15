import React from 'react';
import Isvg from 'react-inlinesvg';

import TaskStore from './../Stores/Store';

export default class ModalEdit extends React.Component {
	constructor() {
		super()
	}
	_submitEditor(e) {
		console.log(e.target);
		TaskStore._updateTask(e, this.props.editingData, this.props.editingField, false);
		this.props.toggleEditor(e, false);
	}
	render() {
 		return(
			<div className='modal-edit' >
				<textarea defaultValue={this.props.currentValue} />
				<div className="ok" onClick={(e)=>{this._submitEditor(e)}}>
					<Isvg src="../imgs/ok-icon.svg" />
				</div>
				<div className="cross" onClick={(e)=>{this.props.toggleEditor(e, false)}}>
					<Isvg src="../imgs/cross-icon.svg" ></Isvg>
				</div>
			</div>
		)
	}
}