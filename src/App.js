import { Component } from 'react'
import { connect } from 'react-redux'
import PublicPage from './components/PublicPage'
import PrivatePage from './components/PrivatePage'
import TopMenu from './components/TopMenu'
import './App.css'

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
			<div className="App">
				<TopMenu />
				{page}
			</div>
		)
	}
}

export default connect(mapStateToProps)(App)