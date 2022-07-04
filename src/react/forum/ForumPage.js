import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap"

import * as forumThreadActions from "../../redux/forum/ForumThreadActions"

const mapStateToProps = state => {
	return state
}

class ForumPage extends Component {

	constructor(props){
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

	render(){

		const forumThreads = this.props.forumThreadReducer.forumThreads.filter(thread => {
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
					{/*<td>
						<Button id={"EditButton" + user.userID} className="custom-mr" variant="custom" onClick={e => this.showUserModal(e, user)}><i className="fa-solid fa-pencil"></i></Button>
						<Button id={"DeleteButton" + user.userID} variant="danger" onClick={event => this.askDelete(event, user.userID)}><i className="fa-solid fa-trash-can"></i></Button>
						{this.props.userManagementReducer.showDeleteConfirm ? <Confirm callBack={() => this.handleDelete(user.userID)} /> : ''}
					</td>*/}
				</tr>
			)
		})

		return (
			<main className="page-content p-3">
				<Container fluid>
						<Row className="align-items-center">
							<Col xs="auto">
								<h1>Foren&uuml;bersicht</h1>
							</Col>
							<Col xs="auto">
								<Button variant="custom" id="OpenCreateUserDialogButton">
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
			</main>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	populateAllThreadsAction: forumThreadActions.getPopulateAllThreadsAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)