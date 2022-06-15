import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getShowLoginDialogAction} from '../../redux/authentication/AuthenticationActions'

class LoginButton extends Component {

	showLoginDialog = () => {
		const dispatch = this.props.dispatch
		dispatch(getShowLoginDialogAction())
	}

	render(){
		return(
			<div>
				<Button variant="custom" onClick={this.showLoginDialog}>
					Login
				</Button>
			</div>
		)
	}
}

export default connect()(LoginButton)