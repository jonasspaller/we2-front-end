import * as userManagementActions from './UserManagementActions'

const initialState = {
	showUserCreateModal: false,
	savingPending: false,
	saveError: null
}

export default function UserManagementReducer(state = initialState, action){

	switch(action.type){
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
				saveError: null
			}
		case userManagementActions.CREATION_ERROR:
			return {
				...state,
				savingPending: false,
				saveError: action.saveError
			}
		default:
			return state
	}
}