import React, {Component} from "react"
import { connect } from "react-redux"

const mapStateToProps = state => {
	return state
}

class PrivatePage extends Component {

	render(){
		return(
			<main className="page-content p-3" id="PrivatePage">
				<h1>Willkommen, {this.props.authenticationReducer.user.userName}!</h1>
			</main>
		)
	}
}

export default connect(mapStateToProps)(PrivatePage)