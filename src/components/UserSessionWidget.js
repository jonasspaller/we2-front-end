import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../actions/AuthenticationActions'

const mapStateToProps = state => {
	return state
}

class UserSessionWidget extends Component {

	constructor(props){
		super(props)
		this.state = {
			show: false
		}
		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleShow(e){
		e.preventDefault()
		const {showLoginDialogAction} = this.props
		showLoginDialogAction()
	}

	handleClose(){
		const {hideLoginDialogAction} = this.props
		hideLoginDialogAction()
	}

	render(){

		var showDialog = this.props.showLoginDialog
		if(showDialog === undefined){
			showDialog = false
		}

		return(
			<>
				<Button variant="outline-primary" onClick={this.handleShow}>
					Login
				</Button>

				<Modal show={showDialog} onHide={this.handleClose} centered>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" name="username" placeholder="Username" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" placeholder="Password" />
							</Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>Close</Button>
						<Button variant="primary" onClick={this.handleClose}>Login</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
	hideLoginDialogAction: authenticationActions.getHideLoginDialogAction
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget