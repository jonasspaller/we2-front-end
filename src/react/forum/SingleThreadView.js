import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"

import { getAllMessagesFromThread, getShowCreateMessageModalAction, getPopulateAllMessagesAction } from "../../redux/forum/ForumThreadActions";
import CreateMessageModal from "./CreateMessageModal";

const mapStateToProps = state => {
	return {
		showCreateMessageModal: state.forumThreadReducer.showCreateMessageModal,
		messages: state.forumThreadReducer.threadMessages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	populateMessagesToState: getPopulateAllMessagesAction,
	showCreateMessageModalAction: getShowCreateMessageModalAction
}, dispatch)

class SingleThreadView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			error: null,
			searchquery: ""
		}
	}

	componentDidMount() {

		getAllMessagesFromThread(this.props.thread._id, (err, messages) => {
			if (err) {
				this.setState({ error: err })
			} else if (!messages) {
				this.setState({ error: "Es wurden keine Nachrichten gefunden" })
			} else {
				const { populateMessagesToState } = this.props
				populateMessagesToState(messages)
			}
		})
	}

	handleSearch = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value
		this.setState({ [name]: value })
	}

	showCreateModal = (e) => {
		e.preventDefault()

		const { showCreateMessageModalAction } = this.props
		showCreateMessageModalAction()
	}

	render() {

		let errorHint
		if (this.state.error) {
			errorHint = <p className="text-danger">{this.state.error}</p>
		}

		const threadMessages = this.props.messages.filter(message => {
			if (this.state.searchquery === "") {
				return message
			} else if (message.title.toLowerCase().includes(this.state.searchquery.toLowerCase())) {
				return message
			} else {
				return null
			}
		}).map((message, i) => {
			return (
				<div key={i} className="forumMessage" id={"ForumMessage" + message._id}>
					<h2>{message.title}</h2>
					<p className="author">
						<i className="fa-solid fa-user custom-mr userpic"></i>
						{message.authorID}
					</p>
					<p>{message.text}</p>
				</div>
			)
		})

		return (
			<>
				<main className="page-content">

					<Container fluid className="content-header p-3">
						<Row className="align-items-center">
							<Col xs="auto">
								<h1>{this.props.thread.name}</h1>
							</Col>
							<Col xs="auto">
								<Button variant="custom" id="OpenCreateForumMessageDialogButton" onClick={this.showCreateModal}>
									<i className="fa-solid fa-plus custom-mr"></i>
									Neue Nachricht
								</Button>
							</Col>
							<Col >
								<InputGroup className="w-50">
									<InputGroup.Text>
										<i className="fa-solid fa-magnifying-glass"></i>
									</InputGroup.Text>
									<Form.Control type="search" name="searchquery" placeholder="Nach MessageTitle suchen" onChange={this.handleSearch} />
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<p>{this.props.thread.description}</p>
						</Row>
					</Container>

					<Container className="js-subcontent">
						{errorHint}
						{threadMessages}
					</Container>
				</main>
				{this.props.showCreateMessageModal ? <CreateMessageModal thread={this.props.thread} /> : ''}
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleThreadView)