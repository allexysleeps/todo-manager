import React from 'react';
import axios from 'axios';

import TaksStore from '../Stores/Store';

export default class SignUp extends React.Component {
	_signUp(e) {
		e.preventDefault();
		let name = e.target.elements[0].value;
		let username = e.target.elements[1].value;
		let password = e.target.elements[2].value;

		axios.post('/signup', {name, username, password})
			.then((res)=> {
				console.log(res);
				TaksStore._setUserId(res.data.user.id);
			})
			.catch((err)=> {
				console.log(err);
			})
	}
	
	render() {
		return(
			<div className="sign-frame">
				<h3>Sign Up</h3>
				<form onSubmit={(e)=>{this._signUp(e)}} className="login-form">
					<input
						type="text"
						name="name"
						required
						placeholder="Name"/>
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
					<input type="submit" value="Sign Up" />
				</form>
				<p className='sign-switcher' onClick={(e)=>{this.props._signSwitch(e, 'signin')}}>Sign in</p>
			</div>
		)
	}
}