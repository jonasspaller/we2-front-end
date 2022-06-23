import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userManagementActions from "../../redux/user/UserManagementActions";

import UserModal from "./UserModal";
import Confirm from "./ConfirmUserDelete";

const mapStateToProps = state => {
	return state
}

class UserManagement extends Component {

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

		const {showConfirmAction} = this.props
		showConfirmAction()
	}

	handleDelete = (userID) => {
		const { deleteUserAction } = this.props
		deleteUserAction(userID, this.props.authenticationReducer.accessToken)
	}

	render() {

		const users = this.props.userManagementReducer.allUsers.map((user, i) => {
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
					<h1>Nutzerverwaltung</h1>

					<Button variant="custom" id="OpenCreateUserDialogButton" onClick={e => this.showUserModal(e, null)} >
						<i className="fa-solid fa-plus custom-mr"></i>
						Neuer Nutzer
					</Button>

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