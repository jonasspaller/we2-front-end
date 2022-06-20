import { Component } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { connect } from "react-redux"

import { updateUser } from '../../redux/user/UserManagementService'

const mapStateToProps = state => {
	return state
}

class UserModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			password: '',
			isAdministrator: false
		}
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

		// check if an existing user is updated, or a new user is created
		if(this.props.userToEdit){
			
			// update existing user
			const newUserName = this.state.userName !== '' ? this.state.userName : null
			const newPassword = this.state.password !== '' ? this.state.password : null

			updateUser(this.props.userToEdit.userID, newUserName, newPassword, this.state.isAdministrator, this.props.authenticationReducer.accessToken, (err, userUpdated) => {
				if(err){
					// alert error
				} else {
					// success
				}
			})
		} else {
			// create new uer
		}
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.closeModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{this.props.userToEdit ? this.props.userToEdit.userID + " bearbeiten" : 'Neuen Nutzer anlegen'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<Form.Control className="mb-3" type="text" name="userName" placeholder={this.props.userToEdit ? this.props.userToEdit.userName : 'Username'} onChange={this.handleChange} />
						</Form.Group>
						<p>{this.state.userName}</p>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control className="mb-3" id="LoginPasswordInput" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
						</Form.Group>
						<p>{this.state.password}</p>
						<Form.Group>
							<Form.Check name="isAdministrator" onChange={this.handleCheckbox} label="Administrator" />
						</Form.Group>
						<p>{this.state.isAdministrator ? 'true' : 'false'}</p>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="custom" type="submit" onClick={this.handleSubmit}>Login</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default connect(mapStateToProps)(UserModal)