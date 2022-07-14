import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap"

import * as forumThreadActions from "../../redux/forum/ForumThreadActions"
import CreateThreadModal from "./CreateThreadModal"
import EditThreadModal from "./EditThreadModal"
import ConfirmThreadDelete from "./ConfirmThreadDelete"

const mapStateToProps = state => {
	return {
		token: state.authenticationReducer.accessToken,
		forumThreads: state.forumThreadReducer.forumThreads,
		showCreateModal: state.forumThreadReducer.showCreateModal,
		showEditModal: state.forumThreadReducer.showEditModal,
		error: state.forumThreadReducer.error,
		pending: state.forumThreadReducer.pending,
		threadToEdit: state.forumThreadReducer.threadToEdit,
		showDeleteThreadConfirm: state.forumThreadReducer.showDeleteThreadConfirm
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	populateAllThreadsAction: forumThreadActions.getPopulateAllThreadsAction,
	showCreateModalAction: forumThreadActions.getShowCreateModalAction,
	showEditModalAction: forumThreadActions.getShowEditModalAction,
	showConfirmAction: forumThreadActions.getShowConfirmAction,
	deleteThreadAction: forumThreadActions.deleteThread,
	showSingleThreadAction: forumThreadActions.getShowSingleThreadAction
}, dispatch)

class ThreadOverview extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchquery: ''
		}
	}

	componentDidMount() {

		// get all threads and put this list in redux store
		const { populateAllThreadsAction } = this.props

		forumThreadActions.getAllForumThreads((threads) => {
			populateAllThreadsAction(threads)
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

		const { showCreateModalAction } = this.props
		showCreateModalAction()
	}

	showEditThreadModal = (e, thread) => {
		e.preventDefault()

		const { showEditModalAction } = this.props
		showEditModalAction(thread)
	}

	askDelete = (e) => {
		e.preventDefault()

		const { showConfirmAction } = this.props
		showConfirmAction()
	}

	handleDelete = (threadID) => {
		const { deleteThreadAction } = this.props
		deleteThreadAction(threadID, this.props.token)
	}

	showSingleThread = (e, thread) => {
		e.preventDefault()

		const { showSingleThreadAction } = this.props
		showSingleThreadAction(thread)
	}

	render() {

		const forumThreads = this.props.forumThreads.filter(thread => {
			if (this.state.searchquery === "") {
				return thread
			} else if (thread.name.toLowerCase().includes(this.state.searchquery.toLowerCase())) {
				return thread
			} else {
				return null
			}
		}).map((thread, i) => {
			return (
				<tr key={i} id={"ForumThread" + thread._id} className="forumThread">
					<td>{thread.name}</td>
					<td>{thread.description}</td>
					<td>{thread.ownerID}</td>
					<td>
						<Button id={"EditForumThreadButton" + thread._id} className="custom-mr" variant="custom" onClick={e => this.showEditThreadModal(e, thread)}><i className="fa-solid fa-pencil"></i></Button>
						<Button id={"DeleteForumThreadButton" + thread._id} className="custom-mr" variant="danger" onClick={this.askDelete}><i className="fa-solid fa-trash-can"></i></Button>
						<Button id={"ViewForumThreadButton" + thread._id} variant="custom" onClick={e => this.showSingleThread(e, thread)}><i className="fa-solid fa-angles-right"></i></Button>
						{this.props.showDeleteThreadConfirm ? <ConfirmThreadDelete callBack={() => this.handleDelete(thread._id)} /> : ''}
					</td>
				</tr>
			)
		})

		return (
			<>
				<main className="page-content">
					<Container fluid className="content-header p-3">
						<Row className="align-items-center">
							<Col xs="auto">
								<h1>Foren&uuml;bersicht</h1>
							</Col>
							<Col xs="auto">
								<Button variant="custom" id="OpenCreateForumThreadDialogButton" onClick={this.showCreateModal}>
									<i className="fa-solid fa-plus custom-mr"></i>
									Neuer Thread
								</Button>
							</Col>
							<Col >
								<InputGroup className="w-50">
									<InputGroup.Text>
										<i className="fa-solid fa-magnifying-glass"></i>
									</InputGroup.Text>
									<Form.Control type="search" name="searchquery" placeholder="Nach ForumThread suchen" onChange={this.handleSearch} />
								</InputGroup>
							</Col>
						</Row>
					</Container>

					<Container className="js-subcontent">
						<Table responsive striped borderless id="ForumThreadList">
							<thead>
								<tr>
									<th>Name</th>
									<th>Beschreibung</th>
									<th>Owner</th>
									<th>Aktionen</th>
								</tr>
							</thead>
							<tbody>
								{forumThreads}
							</tbody>
						</Table>
					</Container>
				</main>
				{this.props.showCreateModal ? <CreateThreadModal /> : ''}
				{this.props.showEditModal ? <EditThreadModal /> : ''}
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadOverview)