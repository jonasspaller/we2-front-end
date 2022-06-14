import React, { Component } from 'react'
import { connect } from 'react-redux'
import './custom.css'
import { Routes, Route } from 'react-router-dom'

import TopMenu from './components/TopMenu'
import PublicPage from './components/PublicPage'
import PrivatePage from './components/PrivatePage'
import Footer from './components/Footer'
import UserManagement from './components/UserManagement'
import ActivityBar from './components/ActivityBar'
import AccessDenied from './components/AccessDenied'

const mapStateToProps = state => {
	return state
}

class App extends Component {

	render() {

		const token = this.props.accessToken
		const user = this.props.user

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