import { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingSpinner from "../components/LoadingSpinner";

import { getHideCreateMessageModalAction, createMessage } from "../../redux/forum/ForumThreadActions";

const mapStateToProps = state => {
	return {
		token: state.authenticationReducer.accessToken,
		showCreateMessageModal: state.forumThreadReducer.showCreateMessageModal
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	hideModalAction: getHideCreateMessageModalAction,
	createMessageAction: createMessage
}, dispatch)

class CreateMessageModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			title: "",
			text: ""
		}
	}

	hideModal = () => {
		const { hideModalAction } = this.props
		hideModalAction()
	}

	handleChange = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value
		this.setState({ [name]: value })
	}

	handleSubmit = e => {
		e.preventDefault()

		const { createMessageAction } = this.props
		createMessageAction(this.props.thread._id, this.state.title, this.state.text, this.props.token)
	}

	render(){

		let showCreateMessageModal = this.props.showCreateMessageModal
		if (showCreateMessageModal === undefined) {
			showCreateMessageModal = false
		}

		let errorHint
		if (this.props.error) {
			errorHint = <p className="text-danger">{this.props.error}</p>
		}

		return (
			<>
				<Modal show={showCreateMessageModal} onHide={this.hideModal} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Neue Nachricht anlegen
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Titel</Form.Label>
								<Form.Control id="ForumMessageTitleInput" className="mb-3" type="text" name="title" placeholder="Titel der Nachricht" onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Text</Form.Label>
								<Form.Control id="ForumMessageTextInput" className="mb-3" type="text" name="text" placeholder="Text der Nachricht" onChange={this.handleChange} required />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						{errorHint}
						{this.props.pending ? <LoadingSpinner /> : ''}
						<Button id="CancelCreateForumMessageButton" variant="danger" type="cancel" onClick={this.hideModal}>Abbrechen</Button>
						<Button id="CreateForumMessageButton" variant="custom" type="submit" onClick={this.handleSubmit}>Speichern</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageModal)