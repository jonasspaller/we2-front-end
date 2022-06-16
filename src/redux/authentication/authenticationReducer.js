import * as authenticationActions from './AuthenticationActions'

const initialState = {
	loginPending: false,
	showLoginDialog: false,
	error: null,
	user: null,
	accessToken: null
}

export default function AuthenticationReducer(state = initialState, action){

	console.log("AuthenticationReducer: " + action.type)

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
		case authenticationActions.AUTHENTICATION_PENDING:
			return {
				...state,
				pending: true,
				error: null
			}
		case authenticationActions.AUTHENTICATION_SUCCESS:
			return {
				...state,
				showLoginDialog: false,
				pending: false,
				user: action.user,
				accessToken: action.accessToken
			}
		case authenticationActions.AUTHENTICATION_ERROR:
			return {
				...state,
				pending: false,
				error: action.error
			}
		case authenticationActions.LOGOUT_USER:
			return {
				...state,
				user: null,
				accessToken: null
			}
		default:
			return state
	}
}