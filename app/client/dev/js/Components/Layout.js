import React from 'react';
import axios from 'axios';

import TaskStore from '../Stores/Store';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import TaskManagerContent from './TaskManagerContent';



export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			data: TaskStore._getStoreData(),
			signModal: 'signin'
		}
		this._pullStoreData = this._pullStoreData.bind(this);
	}

	_signSwitch(e, nextModal) {
		this.setState({
			signModal: 'signup'
		})
	}

	_pullStoreData() {
		this.setState({
			data: TaskStore._getStoreData()
		})
	}

	componentWillMount() {
		TaskStore._checkSession();
		TaskStore.on('change', this._pullStoreData)
	}
	componentDidMount() {
		let IntervalServerPull = setInterval(()=>{TaskStore._getServerData()}, 10000);
		this.setState({
			IntervalServerPull
		})
	}
	componentWillUnmount() {
		clearInterval(this.state.IntervalServerPull);
		TaskStore.removeListener('change', this._pullStoreData)
	}

	render() {
		return (
			<div className='app-body'>
			<Header />
			{
				this.state.data
					? <TaskManagerContent data={this.state.data}/>
					: this.state.signModal == 'signin'
						? <SignIn  _signSwitch={this._signSwitch.bind(this)}/>
						: <SignUp _signSwitch={this._signSwitch.bind(this)}/>
			}
			
			<Footer />
			</div>
		);
	};
}