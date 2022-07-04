import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { Modal, Form, Button } from "react-bootstrap"
import LoadingSpinner from "../components/LoadingSpinner"

import * as forumThreadActions from "../../redux/forum/ForumThreadActions"

const mapStateToProps = state => {
	return {
		token: state.authenticationReducer.accessToken,
		showEditModal: state.forumThreadReducer.showEditModal,
		error: state.forumThreadReducer.error,
		pending: state.forumThreadReducer.pending,
		threadToEdit: state.forumThreadReducer.threadToEdit
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	hideEditModalAction: forumThreadActions.getHideEditModalAction,
	updateForumThreadAction: forumThreadActions.updateForumThread
}, dispatch)

class EditThreadModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			forumName: this.props.threadToEdit.name,
			forumDescription: this.props.threadToEdit.description,
		}
	}

	handleClose = () => {
		const { hideEditModalAction } = this.props
		hideEditModalAction()
	}

	handleChange = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { updateForumThreadAction } = this.props
		updateForumThreadAction(
			this.props.threadToEdit._id,
			this.state.forumName,
			this.state.forumDescription,
			this.props.token
		)
	}

	render() {

		let showEditModal = this.props.showEditModal
		if (showEditModal === undefined) {
			showEditModal = false
		}

		let errorHint
		if (this.props.error) {
			errorHint = <p className="text-danger">{this.props.error}</p>
		}

		return (
			<>
				<Modal show={showEditModal} onHide={this.handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Forumthread bearbeiten
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control id="ForumThreadNameInput" className="mb-3" type="text" name="forumName" placeholder="Forumname" value={this.state.forumName} onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Beschreibung</Form.Label>
								<Form.Control id="ForumThreadDescriptionInput" className="mb-3" type="text" name="forumDescription" placeholder="Forumbeschreibung" value={this.state.forumDescription} onChange={this.handleChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						{errorHint}
						{this.props.pending ? <LoadingSpinner /> : ''}
						<Button id="CancelCreateForumThreadButton" variant="danger" type="cancel" onClick={this.handleClose}>Abbrechen</Button>
						<Button id="CreateForumThreadButton" variant="custom" type="submit" onClick={this.handleSubmit}>Speichern</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditThreadModal)