import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import fs from 'fs';
import Redis from 'connect-redis';


require('./passport');
import router from './routes'

const RedisStore = Redis(session);
const app = express();
const reactApp = `${__dirname}/../client/prod`;

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: false}))
	.use(session({
		store: new RedisStore(),
		secret: "There is no Santa Claus",
		resave: false,
		saveUninitialized: false
	}))
	.use(passport.initialize())
	.use(passport.session())
	.use(express.static(reactApp))
	.use(router)
	.listen(8080)
	console.log(`it's alive`);