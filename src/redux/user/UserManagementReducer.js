import * as userManagementActions from './UserManagementActions'

const initialState = {
	showUpdateModal: false,
	updateError: null,
	savingPending: false,
	oldUser: null,
	newUser: null
}

export default function UserManagementReducer(state = initialState, action){

	switch(action.type){
		case userManagementActions.SHOW_UPDATE_MODAL:
			return {
				...state,
				showUpdateModal: true
			}
		case userManagementActions.HIDE_UPDATE_MODAL:
			return {
				...state,
				showUpdateModal: false
			}
		case userManagementActions.UPDATE_PENDING:
			return {
				...state,
				savingPending: true
			}
		case userManagementActions.UPDATE_SUCCESS:
			return {
				...state,
				showUpdateModal: false,
				updateError: null,
				savingPending: false,
				updUserName: action.updUser.userName,
				updPassword: action.updUser.password,
				updIsAdmin: action.updUser.isAdministrator
			}
		case userManagementActions.UPDATE_ERROR:
			return {
				...state,
				updateError: action.updateError,
				savingPending: false
			}
		default:
			return state
	}
}