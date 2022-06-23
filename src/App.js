import React, { Component } from 'react'
import { connect } from 'react-redux'
import './custom.css'

import TopMenu from './react/components/TopMenu'
import PublicPage from './react/components/PublicPage'
import PrivatePage from './react/components/PrivatePage'
import Footer from './react/components/Footer'

const mapStateToProps = state => {
	return state
}

class App extends Component {

	render() {

		const token = this.props.authenticationReducer.accessToken
		let page

		if(token){
			page = <PrivatePage />
		} else {
			page = <PublicPage />
		}

		return (
			<>
				<TopMenu />
				{page}
				<Footer />
			</>
		)
	}
}

export default connect(mapStateToProps)(App)