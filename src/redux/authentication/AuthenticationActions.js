import jwtDecode from "jwt-decode"

export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG"
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG"

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"

export const LOGOUT_USER = "LOGOUT_USER"

export function getShowLoginDialogAction() {
	return {
		type: SHOW_LOGIN_DIALOG
	}
}

export function getHideLoginDialogAction() {
	return {
		type: HIDE_LOGIN_DIALOG
	}
}

export function getAuthenticationPendingAction() {
	return {
		type: AUTHENTICATION_PENDING
	}
}

export function getAuthenticationSuccessAction(userObject, accessToken) {
	return {
		type: AUTHENTICATION_SUCCESS,
		user: userObject,
		accessToken: accessToken
	}
}

export function getAuthenticationErrorAction(error) {
	return {
		type: AUTHENTICATION_ERROR,
		error: error
	}
}

export function getLogoutUserAction() {
	return {
		type: LOGOUT_USER
	}
}

export function authenticateUser(userID, password) {

	return dispatch => {

		// queue pending action
		dispatch(getAuthenticationPendingAction())

		// build request to rest api
		const base64credentials = btoa(userID + ":" + password)
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64credentials
			}
		}

		// send request
		fetch("https://localhost/authenticate", requestOptions)
			.then(handleFetchResponse)
			.then(fetchReturn => {
				const action = getAuthenticationSuccessAction(fetchReturn.userObject, fetchReturn.accessToken)
				dispatch(action)
			})
			.catch(error => {
				dispatch(getAuthenticationErrorAction(error))
			})
	}
}

function handleFetchResponse(res) {

	const authHeader = res.headers.get("Authorization")

	if (!authHeader || !res.ok){
		logout()
		return Promise.reject("Etwas ist schiefgelaufen")
	}

	const accessToken = authHeader.split(" ")[1]
	const userObject = jwtDecode(accessToken)

	return { userObject, accessToken }
}

function logout() {
	return dispatch => {
		dispatch(getLogoutUserAction())
	}
}