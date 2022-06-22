import * as userManagementActions from './UserManagementActions'

const initialState = {
	updateError: null,
	savingPending: false
}

export default function UserManagementReducer(state = initialState, action){

	switch(action.type){
		case userManagementActions.UPDATE_PENDING:
			return {
				...state,
				savingPending: true
			}
		case userManagementActions.UPDATE_SUCCESS:
			return {
				...state,
				updateError: null,
				savingPending: false
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