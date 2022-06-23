import * as userManagementActions from './UserManagementActions'

const initialState = {
	showUserCreateModal: false,
	savingPending: false,
	saveError: null,
	allUsers: [],
	showUpdateModal: false,
	userToUpdate: null,
	updatePending: false,
	updateError: null
}

export default function UserManagementReducer(state = initialState, action) {

	switch (action.type) {
		case userManagementActions.POPULATE_ALL_USERS:
			return {
				...state,
				allUsers: action.users
			}
		case userManagementActions.SHOW_USER_CREATE_MODAL:
			return {
				...state,
				showUserCreateModal: true,
				saveError: null
			}
		case userManagementActions.HIDE_USER_CREATE_MODAL:
			return {
				...state,
				showUserCreateModal: false
			}
		case userManagementActions.CREATION_PENDING:
			return {
				...state,
				savingPending: true
			}
		case userManagementActions.CREATION_SUCCESS:
			return {
				...state,
				showUserCreateModal: false,
				savingPending: false,
				saveError: null,
				allUsers: state.allUsers.concat(action.user)
			}
		case userManagementActions.CREATION_ERROR:
			return {
				...state,
				savingPending: false,
				saveError: action.saveError
			}
		case userManagementActions.DELETE_USER:
			return {
				...state,
				allUsers: state.allUsers.filter(user => user.userID !== action.userToDelete)
			}
		case userManagementActions.SHOW_UPDATE_MODAL:
			return {
				...state,
				showUpdateModal: true,
				userToUpdate: action.userToUpdate
			}
		case userManagementActions.HIDE_UPDATE_MODAL:
			return {
				...state,
				showUpdateModal: false
			}
		case userManagementActions.UPDATE_PENDING:
			return {
				...state,
				updatePending: true
			}
		case userManagementActions.UPDATE_SUCCESS:
			return {
				...state,
				showUpdateModal: false,
				updatePending: false,
				updateError: null,
				allUsers: state.allUsers.map(user => (user.userID === action.updatedUser.userID) ? action.updatedUser : user)
			}
		case userManagementActions.UPDATE_ERROR:
			return {
				...state,
				updatePending: false,
				updateError: action.updateError
			}
		default:
			return state
	}
}