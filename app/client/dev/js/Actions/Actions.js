import dispatcher from './../Dispatcher';

export function _updateTask(e, data, field, isStatus) {
	dispatcher.dispatch({
		type: 'UPDATE_TASK',
		data: {
			e, data, field, isStatus
		}
	})
}