import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteUser } from "../../redux/user/UserManagementActions";
import UserUpdateModal from "./UserUpdateModal";

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

		// build request to rest api for showing all users
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.authenticationReducer.accessToken
			}
		}

		// send request
		fetch("https://localhost/users", requestOptions)
			.then(response => response.json())
			.then(users => {
				this.setState({users: users})
			})
	}

	handleDeleteUser = (event, user) => {
		event.preventDefault()
		
		deleteUser(user.userID, this.props.authenticationReducer.accessToken, (err, userDeleted) => {
			if(err || !userDeleted){
				// alert error
			} else {
				event.target.closest("TR").remove()
			}
		})
	}

	render(){

		return(
			<>
			<main className="page-content p-3">
				<h1>Nutzerverwaltung</h1>

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
						{this.state.users.map((user, i) => {
							return (
								<tr key={i} id={"UserItem" + user.userID}>
									<td>{user.userID}</td>
									<td>{user.userName}</td>
									<td>{user.isAdministrator ? 'Ja' : 'Nein'}</td>
									<td>
										<UserUpdateModal user={user}/>
										<Button id={"DeleteButton" + user.userID} variant="danger" onClick={event => this.handleDeleteUser(event, user)}><i className="fa-solid fa-trash-can"></i></Button>
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

export default connect(mapStateToProps)(UserManagement)