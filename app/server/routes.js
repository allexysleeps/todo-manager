import passport from 'passport';
const router = require('express').Router()

import { sendData, addTask, deleteTask, updateTask } from './dbActions';


function requireLogin(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.send('403 forbidden');
	}
	next();
}

router
	.post('/login', passport.authenticate('local'), (req, res)=> {
		res.send({
			session: req.session,
			user: req.user,
			isAuthenticated: req.isAuthenticated()
		})
	})
	.get('/:user_id', requireLogin, (req, res, next)=> {
		sendData(req, res, next);
		
	})
	.post('/:user_id', requireLogin, (req, res, next)=> {
		if(req.params.user_id != 'login') {
			addTask(req, res, next);
		}
	})
	.delete('/:user_id/:timestamp', requireLogin, (req, res, next)=> {
		deleteTask(req, res, next);
	})
	.put('/:user_id/:timestamp', requireLogin, (req, res, next)=> {
		updateTask(req, res, next);
	})

module.exports = router