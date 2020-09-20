import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

import Routes from './components/routing/Routes'

import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import './App.css'

import { startGetUser } from './actions/userAction'

const store = configureStore()

// console.log(store.getState())

//notify changes
// store.subscribe(() => {
// 	console.log(store.getState())
// })

const App = () => {
	//useEffect similar to componentDidMount LifeCycle
	useEffect(() => {
		//handle page reload
		if (localStorage.getItem('authToken')) {
			store.dispatch(startGetUser())
		}
		// log user out from all tabs if they log out in one tab
		// window.addEventListener('storage', () => {
		// 	if (!localStorage.token) store.dispatch(startUserLogout())
		// })
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
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	)
}

export default App

//NPM RUN DEV
