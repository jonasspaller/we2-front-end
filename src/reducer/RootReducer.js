import * as authenticationActions from '../actions/AuthenticationActions'

const initialState = {
	user: null,
	loginPending: false,
	showLoginDialog: false,
	error: null
}

function rootReducer(state = initialState, action){

	switch(action.type){
		case authenticationActions.SHOW_LOGIN_DIALOG:
			return {
				...state,
				showLoginDialog: true,
				error: null
			}
		case authenticationActions.HIDE_LOGIN_DIALOG:
			return {
				...state,
				showLoginDialog: false,
				error: null
			}
		default:
			return state
	}
}

export default rootReducer