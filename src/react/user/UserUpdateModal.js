import { Component } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as userManagementActions from '../../redux/user/UserManagementActions'
import LoadingSpinner from '../components/LoadingSpinner'

const mapStateToProps = state => {
	return state
}

class UserUpdateModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showUpdateModal: false,
			userName: null,
			password: null,
			isAdministrator: this.props.user.isAdministrator
		}
	}

	handleShow = (e) => {
		e.preventDefault()
		this.setState({showUpdateModal: true})
	}

	handleClose = () => {
		this.setState({showUpdateModal: false})
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})
	}
	
	handleCheckbox = (e) => {
		this.setState({isAdministrator: !this.state.isAdministrator})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const {updateUserAction} = this.props

		updateUserAction(this.props.user.userID, this.state.userName, this.state.password, this.state.isAdministrator, this.props.authenticationReducer.accessToken)
	}

	render() {

		let errorHint
		if(this.props.userManagementReducer.updateError){
			errorHint = <p className="text-danger">{this.props.userManagementReducer.updateError}</p>
		}

		return (
			<>

			<Button id={"EditButton" + this.props.user.userID} variant="custom" onClick={this.handleShow}><i className="fa-solid fa-pencil"></i></Button>

			<Modal show={this.state.showUpdateModal} onHide={this.handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{this.props.user.userID} bearbeiten
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<Form.Control className="mb-3" type="text" name="userName" placeholder={this.props.user.userName} onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control className="mb-3" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
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
	updateUserAction: userManagementActions.updateUser,
	deleteUserAction: userManagementActions.deleteUser,
	savingErrorAction: userManagementActions.getUpdateErrorAction
}, dispatch)

const ConnectedUserUpdateModal = connect(mapStateToProps, mapDispatchToProps)(UserUpdateModal)

export default ConnectedUserUpdateModal