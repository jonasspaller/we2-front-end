import * as authenticationActions from './AuthenticationActions'

const initialState = {
	user: null,
	accessToken: null,
	showLoginDialog: false,
	loginPending: false,
	error: null
}

export default function AuthenticationReducer(state = initialState, action){

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
				loginPending: true,
				error: null
			}
		case authenticationActions.AUTHENTICATION_SUCCESS:
			return {
				...state,
				showLoginDialog: false,
				loginPending: false,
				user: action.user,
				accessToken: action.accessToken
			}
		case authenticationActions.AUTHENTICATION_ERROR:
			return {
				...state,
				loginPending: false,
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