import { Component } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userManagementActions from "../../redux/user/UserManagementActions";

import UserModal from "./UserModal";
import Confirm from "./ConfirmUserDelete";

const mapStateToProps = state => {
	return state
}

class UserManagement extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchquery: ''
		}
	}

	componentDidMount() {

		// get all users and put this list in redux store
		const { populateAllUsersAction } = this.props

		userManagementActions.getAllUsers(this.props.authenticationReducer.accessToken, (users) => {
			populateAllUsersAction(users)
		})
	}

	showUserModal = (e, user) => {
		e.preventDefault()

		const { showUserModalAction } = this.props
		showUserModalAction(user)
	}

	askDelete = (e) => {
		e.preventDefault()

		const { showConfirmAction } = this.props
		showConfirmAction()
	}

	handleDelete = (userID) => {
		const { deleteUserAction } = this.props
		deleteUserAction(userID, this.props.authenticationReducer.accessToken)
	}

	handleSearch = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value
		this.setState({ [name]: value })
	}

	render() {

		const users = this.props.userManagementReducer.allUsers.filter(user => {
			if (this.state.searchquery === "") {
				return user
			} else if (user.userID.toLowerCase().includes(this.state.searchquery.toLowerCase())) {
				return user
			} else {
				return null
			}
		}).map((user, i) => {
			return (
				<tr key={i} id={"UserItem" + user.userID}>
					<td>{user.userID}</td>
					<td>{user.userName}</td>
					<td>{user.isAdministrator ? 'Ja' : 'Nein'}</td>
					<td>
						<Button id={"EditButton" + user.userID} className="custom-mr" variant="custom" onClick={e => this.showUserModal(e, user)}><i className="fa-solid fa-pencil"></i></Button>
						<Button id={"DeleteButton" + user.userID} variant="danger" onClick={event => this.askDelete(event, user.userID)}><i className="fa-solid fa-trash-can"></i></Button>
						{this.props.userManagementReducer.showDeleteConfirm ? <Confirm callBack={() => this.handleDelete(user.userID)} /> : ''}
					</td>
				</tr>
			)
		})

		return (
			<>
				<main className="page-content p-3">
					<Container fluid>
						<Row className="align-items-center">
							<Col xs="auto">
								<h1>Nutzerverwaltung</h1>
							</Col>
							<Col xs="auto">
								<Button variant="custom" id="OpenCreateUserDialogButton" onClick={e => this.showUserModal(e, null)} >
									<i className="fa-solid fa-plus custom-mr"></i>
									Neuer Nutzer
								</Button>
							</Col>
							<Col >
								<InputGroup className="w-50">
									<InputGroup.Text>
										<i className="fa-solid fa-magnifying-glass"></i>
									</InputGroup.Text>
									<Form.Control type="search" name="searchquery" placeholder="Nach User-ID suchen" onChange={this.handleSearch} />
								</InputGroup>
							</Col>
						</Row>
					</Container>

					<Table responsive striped borderless>
						<thead>
							<tr>
								<th>User ID</th>
								<th>Username</th>
								<th>Administrator</th>
								<th>Aktionen</th>
							</tr>
						</thead>
						<tbody>
							{users}
						</tbody>
					</Table>
				</main>
				{this.props.userManagementReducer.showUserModal ? <UserModal /> : ''}
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	populateAllUsersAction: userManagementActions.getPopulateAllUsersAction,
	showUserModalAction: userManagementActions.getShowUserModalAction,
	deleteUserAction: userManagementActions.deleteUser,
	showConfirmAction: userManagementActions.getShowConfirmAction,
	hideConfirmAction: userManagementActions.getHideConfirmAction
}, dispatch)

const ConnectedUserManagementWidget = connect(mapStateToProps, mapDispatchToProps)(UserManagement)

export default ConnectedUserManagementWidget