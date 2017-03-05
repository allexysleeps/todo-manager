import React from 'react';

export default class LoginScreen extends React.Component {
	render() {
		return(
			<div className="login-frame">
				<h3>Log In</h3>
				<form className="login-form">
					<input type="text" required placeholder="Username" />
					<input type="password" required placeholder="Password" />
					<input type="submit" value="Log In" />
				</form>
			</div>
		)
	}
}