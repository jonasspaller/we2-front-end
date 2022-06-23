import jwtDecode from "jwt-decode"

export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG"
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG"

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"

export const UPDATE_CURRENT_USER_DATA = "UPDATE_CURRENT_USER_DATA"

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

export function getUpdateCurrentUserDataAction(updUser){
	return {
		type: UPDATE_CURRENT_USER_DATA,
		selfUpdatedUser: updUser
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
	
	return res.text().then(text => {

		const resBody = text && JSON.parse(text)

		if (!authHeader || !res.ok){
			logout()
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		} else {

			const accessToken = authHeader.split(" ")[1]
			const userObject = jwtDecode(accessToken)
		
			return { userObject, accessToken }
		}
	})
}

function logout() {
	return dispatch => {
		dispatch(getLogoutUserAction())
	}
}