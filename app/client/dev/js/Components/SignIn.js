import React from 'react';
import axios from 'axios';

import TaskStore from './../Stores/Store';


export default class SignIn extends React.Component {
	constructor() {
		super()
	}

	_signIn(e) {
		e.preventDefault();
		let username = e.target.elements[0].value;
		let password = e.target.elements[1].value;

		axios.post('/login', {username, password})
			.then((res)=> {
				TaskStore._setUserId(res.data.user.id);
			})
			.catch((err)=> {
				console.log(err);
			})
	}
	
	render() {
		return(
			<div className="sign-frame">
				<h3>Sign In</h3>
				<form onSubmit={(e)=>{this._signIn(e)}} className="login-form">
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
					<input type="submit" value="Sign In" />
				</form>
				<p className='sign-switcher' onClick={(e)=>{this.props._signSwitch(e, 'signup')}}>Sign up</p>
			</div>
		)
	}
}