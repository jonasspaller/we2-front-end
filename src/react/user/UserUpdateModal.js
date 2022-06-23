import { Component } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as userManagementActions from '../../redux/user/UserManagementActions'

const mapStateToProps = state => {
	return state
}

class UserUpdateModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userName: null,
			password: null,
			isAdministrator: this.props.userManagementReducer.userToUpdate ? this.props.userManagementReducer.userToUpdate.isAdministrator : false
		}
	}

	handleShow = (e, user) => {
		e.preventDefault()
		const {showUpdateModalAction} = this.props
		showUpdateModalAction(user)
	}

	handleClose = () => {
		const {hideUpdateModalAction} = this.props
		hideUpdateModalAction()
	}

	handleChange = (e) => {
		const target = e.target
		const name = target.name
		const value = target.type === 'checkbox' ? target.checked : target.value
		this.setState({[name]: value})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const{updateUserAction} = this.props
		updateUserAction(
			this.props.userManagementReducer.userToUpdate.userID,
			this.state.userName,
			this.state.password,
			this.state.isAdministrator,
			this.props.authenticationReducer.accessToken
		)
	}

	render() {

		let showUpdateModal = this.props.userManagementReducer.showUpdateModal
		if(showUpdateModal === undefined){
			showUpdateModal = false
		}

		let errorHint
		if(this.props.userManagementReducer.updateError){
			errorHint = <p className="text-danger">{this.props.userManagementReducer.updateError}</p>
		}

		return (
			<>

			<Modal show={showUpdateModal} onHide={this.handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{this.props.userManagementReducer.userToUpdate ? this.props.userManagementReducer.userToUpdate.userID + ' bearbeiten' : 'Neuen Nutzer anlegen'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<Form.Control className="mb-3" type="text" name="userName" placeholder={this.props.userManagementReducer.userToUpdate ? this.props.userManagementReducer.userToUpdate.userName : 'Nutzername'} onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control className="mb-3" type="password" name="password" placeholder="Passwort" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Check checked={this.state.isAdministrator} name="isAdministrator" onChange={this.handleChange} label="Administrator" />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{errorHint}
					<Button variant="custom" type="submit" onClick={this.handleSubmit}>Speichern</Button>
				</Modal.Footer>
			</Modal>

			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showUpdateModalAction: userManagementActions.getShowUpdateModalAction,
	hideUpdateModalAction: userManagementActions.getHideUpdateModalAction,
	updateUserAction: userManagementActions.updateUser
}, dispatch)

const ConnectedUserUpdateModal = connect(mapStateToProps, mapDispatchToProps)(UserUpdateModal)

export default ConnectedUserUpdateModal