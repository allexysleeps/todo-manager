import React from 'react';
import axios from 'axios';

import TaskStore from '../Stores/Store';

import LoginScreen from './LoginScreen';
import Header from './Header';
import Footer from './Footer';
import TasksTable from './TasksTable';
import AddTask from './AddTask';



export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			data: TaskStore._getStoreData(),
			authenticated: false,
			user: 'test',
			addModuleStatus: false
		}
	}

	_toggleAddTaskModal(e, status) {
		this.setState({
			addModuleStatus: status
		})
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
		let IntervalServerPull = setInterval(()=>{TaskStore._getServerData()}, 10000);
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
			<Header />
			<div className="page-wrapper">
				{
					this.state.data
						? <TasksTable data = {this.state.data}/>
						: ''
				}
				<div className="button-add" onClick={(e)=>{this._toggleAddTaskModal(e, true)}}>
					add task
				</div>
				{
					this.state.addModuleStatus
						? <AddTask toggleModal={this._toggleAddTaskModal.bind(this)}/>
						: '' 
				}
			</div>
			</div>
		);
	};
}