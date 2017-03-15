import React from 'react';
import axios from 'axios';

import TaskStore from '../Stores/Store';

import LoginScreen from './LoginScreen';
import Header from './Header';
import Footer from './Footer';
import TasksTable from './TasksTable';



export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			data: TaskStore._getStoreData(),
			authenticated: false,
			user: 'test'
		}
	}

	componentWillMount() {
		TaskStore._getServerData();
		TaskStore.on('change', ()=> {
			console.log('store data changed');
			this.setState({
				data: TaskStore._getStoreData()
			})
		})
	}
	componentDidMount() {
		let IntervalServerPull = setInterval(()=>{TaskStore._getServerData()}, 1000000);
		this.setState({
			IntervalServerPull
		})
	}
	componentWillUnmount() {
		clearInterval(this.state.IntervalServerPull);
	}

	render() {
		return (
			<div className='app-body'>
			{
				this.state.data
					? <TasksTable data = {this.state.data}/>
					: ''
			}
			</div>		
		);
	};
}