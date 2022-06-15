import * as authenticationActions from './AuthenticationActions'

const initialState = {
	user: null,
	loginPending: false,
	showLoginDialog: false,
	accessToken: null,
	error: null
}

export default function authenticationReducer(state = initialState, action){

	console.log("authenticationReducer: " + action.type)

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
				userID: action.userID,
				accessToken: action.accessToken
			}
		case authenticationActions.AUTHENTICATION_ERROR:
			return {
				...state,
				pending: false,
				error: "Authentication failed"
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