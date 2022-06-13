import React, { Component } from 'react'
import { connect } from 'react-redux'
import './custom.css'

import TopMenu from './components/TopMenu'
import PublicPage from './components/PublicPage'
import PrivatePage from './components/PrivatePage'
import Footer from './components/Footer'

const mapStateToProps = state => {
	return state
}

class App extends Component {

	render() {

		const token = this.props.accessToken
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