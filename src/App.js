import React, { Component } from 'react'
import { connect } from 'react-redux'
import './custom.css'
import { Routes, Route } from 'react-router-dom'

import TopMenu from './react/components/TopMenu'
import PublicPage from './react/components/PublicPage'
import PrivatePage from './react/components/PrivatePage'
import Footer from './react/components/Footer'
import UserManagement from './react/user/UserManagement'
import ActivityBar from './react/components/ActivityBar'
import AccessDenied from './react/components/AccessDenied'

const mapStateToProps = state => {
	return state
}

class App extends Component {

	render() {

		const token = this.props.authenticationReducer.accessToken
		const user = this.props.authenticationReducer.user

		return (
			<>
				<TopMenu />
				<ActivityBar />
				<Routes>
					<Route path="/" element={token ? <PrivatePage /> : <PublicPage />} />
					<Route path="/userManagement" element={user && user.isAdministrator ? <UserManagement /> : <AccessDenied />} />
				</Routes>
				
				<Footer />
			</>
		)
	}
}

export default connect(mapStateToProps)(App)