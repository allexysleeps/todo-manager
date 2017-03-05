import db from './db';
import passport from 'passport';
import localStrategy from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

passport.use(new localStrategy(authenticate));
// passport.use('local-register', new localStrategy({passReqToCallback: true}, register));

function authenticate(username, password, done) {
	db('users')
		.where('username', username)
		.first()
		.then((user)=>{
			if(!user || !bcrypt.compareSync(password, userpassword)) {
				console.log('invalid username or password');
				return;
			} else {
				done(null, user);
			}
		}, done);
}

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser((user, done)=>{
	db('users')
		.where('id', id)
		.first()
		.then((user)=> {
			done(null, user)
		}, done);
})