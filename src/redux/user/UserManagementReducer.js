import * as userManagementActions from './UserManagementActions'

const initialState = {
	allUsers: [],
	showUserModal: false,
	userToUpdate: null,
	pending: false,
	error: null,
	showDeleteConfirm: false
}

export default function UserManagementReducer(state = initialState, action) {

	switch (action.type) {
		case userManagementActions.POPULATE_ALL_USERS:
			return {
				...state,
				allUsers: action.users
			}
		case userManagementActions.SHOW_USER_MODAL:
			return {
				...state,
				showUserModal: true,
				userToUpdate: action.userToUpdate
			}
		case userManagementActions.HIDE_USER_MODAL:
			return {
				...state,
				showUserModal: false,
				error: null
			}
		case userManagementActions.PENDING:
			return {
				...state,
				pending: true
			}
		case userManagementActions.CREATION_SUCCESS:
			return {
				...state,
				showUserModal: false,
				pending: false,
				error: null,
				allUsers: state.allUsers.concat(action.user)
			}
		case userManagementActions.CREATION_ERROR:
			return {
				...state,
				pending: false,
				error: action.saveError
			}
		case userManagementActions.UPDATE_SUCCESS:
			return {
				...state,
				showUserModal: false,
				pending: false,
				error: null,
				allUsers: state.allUsers.map(user => (user.userID === action.updatedUser.userID) ? action.updatedUser : user)
			}
		case userManagementActions.UPDATE_ERROR:
			return {
				...state,
				pending: false,
				error: action.updateError
			}
		case userManagementActions.DELETE_USER:
			return {
				...state,
				allUsers: state.allUsers.filter(user => user.userID !== action.userToDelete)
			}
		case userManagementActions.SHOW_DELETE_CONFIRM:
			return {
				...state,
				showDeleteConfirm: true
			}
		case userManagementActions.HIDE_DELETE_CONFIRM:
			return {
				...state,
				showDeleteConfirm: false
			}
		default:
			return state
	}
}