import dispatcher from './../Dispatcher';

export function _updateTask(e, field, isStatus) {
	dispatcher.dispatch({
		type: 'UPDATE_TASK',
		e,
		field,
		isStatus
	})
}