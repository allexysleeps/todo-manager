const db = require('./db');

function sendData(req, res, next) {
	let user_id = req.params;
	db('tasks')
		.where('user_id', user_id)
		.then((tasks)=> {
			res.send(tasks);
		})
}

function addTask(req, res, next) {
	let newTask = {
		timestamp: req.body.timestamp,
		title: req.body.title,
		description: req.body.description,
		status: req.body.status,
		user_id: req.params.user_id		
	}
	db('tasks')
		.insert(newTask)
		.then(()=>{
			res.sendStatus(200);
		})
}

function deleteTask(req, res, next) {
	db('tasks')
		.where('user_id', req.params.user_id)
		.where('timestamp', req.params.timestamp)
		.delete()
		.then(()=>{
			res.sendStatus(200);
		})
}

function updateTask(req, res, next) {
	let newData = {
		timestamp: req.body.timestamp,
		title: req.body.title,
		description: req.body.description,
		status: req.body.status,
		user_id: req.params.user_id	
	}
	db('tasks')
		.where('user_id', req.params.user_id)
		.where('timestamp', req.params.timestamp)
		.update(newData)
		.then(()=> {
			res.sendStatus(200);
		})
}

export {
	sendData,
	addTask,
	deleteTask,
	updateTask
}
	