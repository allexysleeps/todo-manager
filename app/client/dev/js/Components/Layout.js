import React from 'react';
import axios from 'axios';

import TaskStore from '../Stores/Store';

import LoginScreen from './LoginScreen';
import Header from './Header';
import Footer from './Footer';
import TaskManagerContent from './TaskManagerContent';



export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			data: TaskStore._getStoreData(),
		}
	}



	componentWillMount() {
		// TaskStore._getServerData();
		TaskStore.on('change', ()=> {
			console.log('store data changed');
			this.setState({
				data: TaskStore._getStoreData()
			})
		})
	}
	componentDidMount() {
		// let IntervalServerPull = setInterval(()=>{TaskStore._getServerData()}, 10000);
		// this.setState({
		// 	IntervalServerPull
		// })
	}
	componentWillUnmount() {
		clearInterval(this.state.IntervalServerPull);
	}

	render() {
		console.log(this.state.data);
		return (
			<div className='app-body'>
			<Header />
			{
				this.state.data
					? <TaskManagerContent data={this.state.data}/>
					: <LoginScreen />
			}
			
			<Footer />
			</div>
		);
	};
}