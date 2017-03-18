'use strict';
import db from './db';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt-nodejs';

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register))


function authenticate(username, password, done) {
	db('users')
		.where('username', username)
		.first()
		.then((user)=>{
			if(!user || !bcrypt.compareSync(password, user.password)) {
				console.log('invalid username or password');
				return done(null, false, { message: "Invalid username or password"});
			}
			done(null, user);	
		}, done);
}

function register(req, username, password, done) {
	db('users')
		.where('username', username)
		.first()
		.then((user) => {
			if(user) {
				return done(null, false, {message: "There is an user with this email already"});
			}			
			
			let newUser = {
				name: req.body.name,
				username: username,
				password: bcrypt.hashSync(password)
			};

			db('users')
				.insert(newUser)
				.then((ids) => {
					newUser.id = ids[0];
					done(null, newUser);
				})
		})
}

passport.serializeUser((user, done)=> {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db('users')
		.where('id', id)
		.first()
		.then((user) => {
			done(null, user);
		}, done)
})