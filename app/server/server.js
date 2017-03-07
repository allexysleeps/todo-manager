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
	.use(express.static(reactApp))
	.get('/:user_id', (req, res, next)=> {
		sendData(req, res, next);
	})
	.post('/:user_id', (req, res, next)=> {
		addTask(req, res, next);
	})
	.delete('/:user_id/:timestamp', (req, res, next)=> {
		deleteTask(req, res, next);
	})
	.put('/:user_id/:timestamp', (req, res, next)=> {
		updateTask(req, res, next);
	})
	// .use(session({
	// 	secret: "There is no Santa Claus",
	// 	resave: false,
	// 	saveUninitialized: false
	// }))
	// .use(passport.initialize())
	// .use(passport.session())
	// .get('/login', (req, res, next)=> {
	// 	res.send({
	// 		session: req.session,
	// 		user: req.user,
	// 		authenticated: req.isAuthenticated()
	// 	})
	// })
	// .post('/login', (req, res, next)=> {
	// 	console.log(req.body);
	// 	passport.authenticate(req.body.username, req.body.password, next);
	// })
	.listen(8080)
	console.log(`it's alive`);