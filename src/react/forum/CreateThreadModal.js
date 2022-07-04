import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { Modal, Form, Button } from "react-bootstrap"
import LoadingSpinner from "../components/LoadingSpinner"

import * as forumThreadActions from "../../redux/forum/ForumThreadActions"

const mapStateToProps = state => {
	return {
		token: state.authenticationReducer.accessToken,
		showCreateModal: state.forumThreadReducer.showCreateModal,
		error: state.forumThreadReducer.error,
		pending: state.forumThreadReducer.pending
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	hideCreateModalAction: forumThreadActions.getHideCreateModalAction,
	createNewForumThreadAction: forumThreadActions.createNewForumThread
}, dispatch)

class CreateThreadModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			forumName: '',
			forumDescription: '',
		}
	}

	handleClose = () => {
		const { hideCreateModalAction } = this.props
		hideCreateModalAction()
	}

	handleChange = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { createNewForumThreadAction } = this.props
		createNewForumThreadAction(
			this.state.forumName,
			this.state.forumDescription,
			this.props.token
		)
	}

	render() {

		let showCreateModal = this.props.showCreateModal
		if (showCreateModal === undefined) {
			showCreateModal = false
		}

		let errorHint
		if (this.props.error) {
			errorHint = <p className="text-danger">{this.props.error}</p>
		}

		return (
			<>
				<Modal show={showCreateModal} onHide={this.handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Neuen Forumthread anlegen
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control id="ForumThreadNameInput" className="mb-3" type="text" name="forumName" placeholder="Forumname" onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Beschreibung</Form.Label>
								<Form.Control id="ForumThreadDescriptionInput" className="mb-3" type="text" name="forumDescription" placeholder="Forumbeschreibung" onChange={this.handleChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateThreadModal)