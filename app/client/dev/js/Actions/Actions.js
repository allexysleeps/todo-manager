import dispatcher from './../Dispatcher';

export function _updateTask(e, data, field, isStatus) {
	dispatcher.dispatch({
		type: 'UPDATE_TASK',
		data: {
			e, data, field, isStatus
		}
	})
}

export function _createTask(data) {
	dispatcher.dispatch({
		type: 'CREATE_TASK',
		data: data
	})
}

export function _deleteTask(timestamp) {
	dispatcher.dispatch({
		type: 'DELETE_TASK',
		data: timestamp
	})
}