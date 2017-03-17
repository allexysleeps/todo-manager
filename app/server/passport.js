'use strict';
import db from './db';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt-nodejs';

passport.use(new LocalStrategy(authenticate));

function authenticate(username, password, done) {
	db('users')
		.where('username', username)
		.first()
		.then((user)=>{
			if(!user || !bcrypt.compareSync(password, user.password)) {
				console.log('invalid username or password');
				return done(null, false, { message: "Invalid email or password"});
			}
			console.log('authenticated');
			done(null, user);	
		}, done);
}

passport.serializeUser((user, done)=> {
	console.log(user.id);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('deserializing');
	db('users')
		.where('id', id)
		.first()
		.then((user) => {
			done(null, user);
		}, done)
})