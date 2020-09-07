import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import './App.css'
import Alert from './components/layout/Alert'
import { startGetUser } from './actions/userAction'
const store = configureStore()

console.log(store.getState())

store.subscribe(() => {
	console.log(store.getState())
})

const App = () => {
	//useEffect similar to componentDidMount LifeCycle
	useEffect(() => {
		//handle page reload
		if (localStorage.getItem('authToken')) {
			store.dispatch(startGetUser())
		}
		// If you want to run an effect and clean it up only once
		// (on mount and unmount), you can pass an empty array ([]) as a second argument
	}, [])
	return (
		//provider makes the store available to all the components
		//the Ghost element which doesn't show up in the dom
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	)
}

export default App

//NPM RUN DEV
