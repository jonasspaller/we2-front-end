import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../redux/authentication/AuthenticationActions'
import LoadingSpinner from './LoadingSpinner'

const mapStateToProps = state => {
	return state
}

class UserSessionWidget extends Component {

	constructor(props){
		super(props)
		this.state = {
			userID: '',
			password: ''
		}
	}

	handleShow = (e) => {
		e.preventDefault()
		const {showLoginDialogAction} = this.props
		showLoginDialogAction()
	}

	handleClose = () => {
		const {hideLoginDialogAction} = this.props
		hideLoginDialogAction()
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})
	}

	handleSubmit = (e) => {
		
		e.preventDefault()
		
		const {userID, password} = this.state
		const {authenticateUserAction} = this.props

		authenticateUserAction(userID, password)
	}

	handleLogout = (e) => {
		e.preventDefault()
		const {logoutAction} = this.props
		logoutAction()
	}

	render(){

		var showDialog = this.props.authenticationReducer.showLoginDialog
		if(showDialog === undefined){
			showDialog = false
		}

		const token = this.props.authenticationReducer.accessToken
		let button

		if(!token){
			button = <Button id="OpenLoginDialogButton" variant="custom" onClick={this.handleShow}>Login</Button>
		} else {
			button = <Button id="LogoutButton" variant="custom" onClick={this.handleLogout}>Logout</Button>
		}

		let errorHint
		if(this.props.authenticationReducer.error){
			errorHint = <p className="text-danger">{this.props.authenticationReducer.error}</p>
		}

		return(
			<>
				{button}

				<Modal show={showDialog} onHide={this.handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Login
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control id="LoginUserIDInput" className="mb-3" type="text" name="userID" placeholder="Username" onChange={this.handleChange} autoFocus />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control id="LoginPasswordInput" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
						{errorHint}
						{this.props.authenticationReducer.loginPending ? <LoadingSpinner /> : ''}
						<Button id="LoginButton" variant="custom" type="submit" onClick={this.handleSubmit}>Login</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
	hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
	authenticateUserAction: authenticationActions.authenticateUser,
	logoutAction: authenticationActions.logout,
	errorAction: authenticationActions.getAuthenticationErrorAction
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget