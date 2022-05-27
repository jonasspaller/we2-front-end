export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG"
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG"

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"

export function getShowLoginDialogAction(){
	return {
		type: SHOW_LOGIN_DIALOG
	}
}

export function getHideLoginDialogAction(){
	return {
		type: HIDE_LOGIN_DIALOG
	}
}

export function getAuthenticationPendingAction(){
	return {
		type: AUTHENTICATION_PENDING
	}
}

export function getAuthenticationSuccessAction(userSession){
	return {
		type: AUTHENTICATION_SUCCESS,
		accessToken: userSession.accessToken
	}
}

export function getAuthenticationErrorAction(error){
	return {
		type: AUTHENTICATION_ERROR,
		error: error
	}
}

export function authenticateUser(userID, password){
	return dispatch => {
		dispatch(getAuthenticationPendingAction())
		login(userID, password)
		.then(
			userSession => {
				const action = getAuthenticationSuccessAction(userSession)
				dispatch(action)
			},
			error => {
				dispatch(getAuthenticationErrorAction(error))
			}
		)
		.catch(error => {
			dispatch(getAuthenticationErrorAction(error))
		})
	}
}

function login(userID, password){

	const base64credentials = btoa(userID + ":" + password)

	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + base64credentials
		}
	}

	return fetch('https://localhost/authenticate', requestOptions)
		.then(handleResponse)
		.then(userSession => {
			return userSession
		})
}

function handleResponse(response){

	const authorizationHeader = response.headers.get("Authorization")

	return response.text().then(() => {

		let token

		if(authorizationHeader){
			token = authorizationHeader.split(" ")[1]
		}

		if(!response.ok){
			if(response.status === 401){
				logout()
			}
			const error = response.statusText
			return Promise.reject(error)
		} else {
			let userSession = {
				accessToken: token
			}
			return userSession
		}
	})
}

function logout(){
	console.log("Logout")
}