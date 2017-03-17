import express from 'express';
import bodyParser from 'body-parser';
import { sendData, addTask, deleteTask, updateTask } from './dbActions'
import session from 'express-session';
import passport from 'passport';
import fs from 'fs';
require('./passport');

const app = express();
const reactApp = `${__dirname}/../client/prod`;

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: false}))
	.use(session({
		secret: "There is no Santa Claus",
		resave: false,
		saveUninitialized: false
	}))
	.use(passport.initialize())
	.use(passport.session())
	.use(express.static(reactApp))
	.post('/login', passport.authenticate('local'), (req, res)=> {
		res.send({
			session: req.session,
			user: req.user,
			isAuthenticated: req.isAuthenticated()
		})
	})
	.get('/:user_id', (req, res, next)=> {
		if(req.isAuthentificated) {
			sendData(req, res, next);
		} else {
			res.send('forbidden');
		}
		
	})
	.post('/:user_id', (req, res, next)=> {
		if(req.params.user_id != 'login') {
			addTask(req, res, next);
		}
	})
	.delete('/:user_id/:timestamp', (req, res, next)=> {
		deleteTask(req, res, next);
	})
	.put('/:user_id/:timestamp', (req, res, next)=> {
		updateTask(req, res, next);
	})
	.listen(8080)
	console.log(`it's alive`);