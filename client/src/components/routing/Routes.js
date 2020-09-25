import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile-forms/CreateProfile'
import ProfilePic from '../profile-forms/Add-ProfilePic'

import EditProfile from '../profile-forms/Edit-Profile'
import AddExperience from '../profile-forms/Add-Experience'
import AddCertification from '../profile-forms/Add-Certifications'
import Profiles from '../Profiles/Profiles'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import PrivateRoute from '../routing/PrivateRoute'
import Profile from '../profile/Profile'
import Alert from '../layout/Alert'
import NotFound from '../layout/NotFound'
import Album from '../Gallery/gallery'

const Routes = () => {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/profile/:id' component={Profile} />

				<PrivateRoute exact path='/gallery/:id' component={Album} />
				<PrivateRoute exact path='/profiles' component={Profiles} />

				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<PrivateRoute exact path='/create-profile' component={CreateProfile} />
				<PrivateRoute exact path='/profile-picture' component={ProfilePic} />
				<PrivateRoute exact path='/edit-profile' component={EditProfile} />
				<PrivateRoute exact path='/add-experience' component={AddExperience} />
				<PrivateRoute
					exact
					path='/add-certification'
					component={AddCertification}
				/>
				<PrivateRoute exact path='/posts' component={Posts} />
				<PrivateRoute exact path='/posts/:id' component={Post} />
				<Route component={NotFound} />
			</Switch>
		</section>
	)
}

export default Routes
