import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import session from 'express-session';
import passport from 'passport';
import fs from 'fs';
require('./passport');

const app = express();
const clientSide = `${__dirname}/../client`;

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
	.use(express.static(clientSide))
	.get('/test', (req, res, next)=> {
		res.send('test');
	})
	.listen(8080)
console.log(`it's alive`);