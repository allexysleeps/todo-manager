import React from 'react';
import axios from 'axios';

export default class LoginScreen extends React.Component {
		constructor() {
			super()
		}
		
		_logIn(e) {
			e.preventDefault();
			let username = e.target.elements[0].value;
			let password = e.target.elements[0].value;
			axios.post('/login', {username, password})
				.then((res)=> {
					console.log(res);
				})
				.catch((err)=> {
					console.log(err);
				})
		}
	
	render() {
		return(
			<div className="login-frame">
				<h3>Log In</h3>
				<form onSubmit={(e)=>{this._logIn(e)}} className="login-form">
					<input 
						type="text"
						name="username"
						required
						placeholder="Username"/>
					<input
						type="password"
						name="password"
						required
						placeholder="Password"/>
					<input type="submit" value="Log In" />
				</form>
			</div>
		)
	}
}