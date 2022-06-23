import { Component } from "react";
import { Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Modal, Form } from "react-bootstrap";

import LoadingSpinner from "../components/LoadingSpinner";

import * as userManagementActions from "../../redux/user/UserManagementActions";

const mapStateToProps = state => {
	return state
}

class UserCreateModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			userID: '',
			userName: '',
			password: '',
			isAdministrator: false
		}
	}

	handleShow = (e) => {
		e.preventDefault()
		const {showUserCreateModalAction} = this.props
		showUserCreateModalAction()
	}

	handleClose = () => {
		const {hideUserCreateModalAction} = this.props
		hideUserCreateModalAction()
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const {createNewUserAction} = this.props
		createNewUserAction(this.state.userID, this.state.userName, this.state.password, this.state.isAdministrator, this.props.authenticationReducer.accessToken)
	}
	
	handleCheckbox = (e) => {
		this.setState({isAdministrator: !this.state.isAdministrator})
	}

	render(){

		let showUserCreateModal = this.props.userManagementReducer.showUserCreateModal
		if(showUserCreateModal === undefined){
			showUserCreateModal = false
		}

		let errorHint
		if(this.props.userManagementReducer.saveError){
			errorHint = <p className="text-danger">{this.props.userManagementReducer.saveError}</p>
		}

		return (
			<>

			<Button variant="custom" id="OpenCreateUserDialogButton" onClick={this.handleShow} >
				<i className="fa-solid fa-plus custom-mr"></i>
				Neuer Nutzer
			</Button>

			<Modal show={showUserCreateModal} onHide={this.handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						Neuen Nutzer anlegen
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>User-ID</Form.Label>
							<Form.Control className="mb-3" type="text" name="userID" placeholder="User-ID" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Nutzername</Form.Label>
							<Form.Control className="mb-3" type="text" name="userName" placeholder="Nutzername" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Passwort</Form.Label>
							<Form.Control className="mb-3" type="password" name="password" placeholder="Passwort" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Check checked={this.state.isAdministrator} name="isAdministrator" onChange={this.handleCheckbox} label="Administrator" />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{errorHint}
					{this.props.userManagementReducer.savingPending ? <LoadingSpinner /> : ''}
					<Button variant="custom" type="submit" onClick={this.handleSubmit}>Speichern</Button>
				</Modal.Footer>
			</Modal>
			
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showUserCreateModalAction: userManagementActions.getShowUserCreateModalAction,
	hideUserCreateModalAction: userManagementActions.getHideUserCreateModalAction,
	createNewUserAction: userManagementActions.createNewUser
}, dispatch)

const ConnectedUserCreateModal = connect(mapStateToProps, mapDispatchToProps)(UserCreateModal)

export default ConnectedUserCreateModal