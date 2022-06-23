import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import * as userManagementActions from "../../redux/user/UserManagementActions";
import { getUpdateCurrentUserDataAction } from "../../redux/authentication/AuthenticationActions"
import UserUpdateModal from "./UserUpdateModal";
import { bindActionCreators } from "redux";
import UserCreateModal from "./UserCreateModal"

const mapStateToProps = state => {
	return state
}

class UserManagement extends Component {

	constructor(props){
		super(props)
		this.state = {
			users: [],
			showUserModal: false,
			userToEdit: null
		}
	}

	componentDidMount(){

		const {populateAllUsersAction} = this.props
		
		userManagementActions.getAllUsers(this.props.authenticationReducer.accessToken, (users) => {
			populateAllUsersAction(users)
		})
	}

	handleDeleteUser = (event, userID) => {
		event.preventDefault()

		const {deleteUserAction} = this.props
		deleteUserAction(userID, this.props.authenticationReducer.accessToken)
	}

	render(){

		return(
			<>
			<main className="page-content p-3">
				<h1>Nutzerverwaltung</h1>

				<UserCreateModal />

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
						{this.props.userManagementReducer.allUsers.map((user, i) => {
							return (
								<tr key={i} id={"UserItem" + user.userID}>
									<td>{user.userID}</td>
									<td>{user.userName}</td>
									<td>{user.isAdministrator ? 'Ja' : 'Nein'}</td>
									<td>
										<UserUpdateModal user={user} />
										<Button id={"DeleteButton" + user.userID} variant="danger" onClick={event => this.handleDeleteUser(event, user.userID)}><i className="fa-solid fa-trash-can"></i></Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</main>

			</>
		)
	}	
}

const mapDispatchToProps = dispatch => bindActionCreators({
	populateAllUsersAction: userManagementActions.getPopulateAllUsersAction,
	deleteUserAction: userManagementActions.deleteUser,
	updateCurrentUserDataAction: getUpdateCurrentUserDataAction
}, dispatch)

const ConnectedUserManagementWidget = connect(mapStateToProps, mapDispatchToProps)(UserManagement)

export default ConnectedUserManagementWidget