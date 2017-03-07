import React from 'react';
import axios from 'axios';

import LoginScreen from './LoginScreen';
import Header from './Header';
import Footer from './Footer';
import TasksTable from './TasksTable';

export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			authenticated: false,
			user: 'test'
		}
	}
	_checkUser() {
		axios.get('/login')
			.then((res)=> {
				this.setState({
					authenticated: res.data.authenticated
				})
			})
			console.log(this.state.authenticated);
	}

	_getData() {
		axios.get(`/1`)
			.then((res)=>{
				console.log(res);
			})
			.catch((err)=>{
				console.log(err);
			})
	}

	componentWillMount() {
		// this._checkUser();
		this._getData();
	}
	render() {
		return (
			<div className='app-body'>
				<Header />
				<TasksTable />
				<Footer />
			</div>
		);
	};
}