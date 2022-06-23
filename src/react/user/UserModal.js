import { Component } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as userManagementActions from "../../redux/user/UserManagementActions"

import LoadingSpinner from "../components/LoadingSpinner"

const mapStateToProps = state => {
	return state
}

class UserUpdateModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userID: '',
			userName: null,
			password: null,
			isAdministrator: this.props.userManagementReducer.userToUpdate ? this.props.userManagementReducer.userToUpdate.isAdministrator : false
		}
	}

	handleShow = (e, user) => {
		e.preventDefault()
		const { showUserModalAction } = this.props
		showUserModalAction(user)
	}

	handleClose = () => {
		const { hideUserModalAction } = this.props
		hideUserModalAction()
	}

	handleChange = (e) => {
		const target = e.target
		const name = target.name
		const value = target.type === 'checkbox' ? target.checked : target.value
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		if (this.props.userManagementReducer.userToUpdate) {
			const { updateUserAction } = this.props
			updateUserAction(
				this.props.userManagementReducer.userToUpdate.userID,
				this.state.userName,
				this.state.password,
				this.state.isAdministrator,
				this.props.authenticationReducer.accessToken
			)
		} else {
			const { createNewUserAction } = this.props
			createNewUserAction(
				this.state.userID,
				this.state.userName,
				this.state.password,
				this.state.isAdministrator,
				this.props.authenticationReducer.accessToken
			)
		}
	}

	render() {

		let showUserModal = this.props.userManagementReducer.showUserModal
		if (showUserModal === undefined) {
			showUserModal = false
		}

		let buttons
		if (this.props.userManagementReducer.userToUpdate) {
			buttons = (
				<>
					<Button id="CancelEditUserButton" variant="danger" type="cancel" onClick={this.handleClose}>Abbrechen</Button>
					<Button id="SaveUserButton" variant="custom" type="submit" onClick={this.handleSubmit}>Speichern</Button>
				</>
			)
		} else {
			buttons = (
				<Button id="CreateUserButton" variant="custom" type="submit" onClick={this.handleSubmit}>Speichern</Button>
			)
		}

		let errorHint
		if (this.props.userManagementReducer.error) {
			errorHint = <p className="text-danger">{this.props.userManagementReducer.error}</p>
		}

		return (
			<>

				<Modal show={showUserModal} onHide={this.handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							{this.props.userManagementReducer.userToUpdate ? this.props.userManagementReducer.userToUpdate.userID + ' bearbeiten' : 'Neuen Nutzer anlegen'}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>User-ID</Form.Label>
								<Form.Control id="UserIDInput" className="mb-3" type="text" name="userID" placeholder="User-ID" onChange={this.handleChange} disabled={this.props.userManagementReducer.userToUpdate} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control id="UserNameInput" className="mb-3" type="text" name="userName" placeholder={this.props.userManagementReducer.userToUpdate ? this.props.userManagementReducer.userToUpdate.userName : 'Nutzername'} onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control id="PasswordInput" className="mb-3" type="password" name="password" placeholder="Passwort" onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Check id="IsAdministratorInput" checked={this.state.isAdministrator} name="isAdministrator" onChange={this.handleChange} label="Administrator" />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						{errorHint}
						{this.props.userManagementReducer.pending ? <LoadingSpinner /> : ''}
						{buttons}
					</Modal.Footer>
				</Modal>

			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showUserModalAction: userManagementActions.getShowUserModalAction,
	hideUserModalAction: userManagementActions.getHideUserModalAction,
	updateUserAction: userManagementActions.updateUser,
	createNewUserAction: userManagementActions.createNewUser
}, dispatch)

const ConnectedUserUpdateModal = connect(mapStateToProps, mapDispatchToProps)(UserUpdateModal)

export default ConnectedUserUpdateModal