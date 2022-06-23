export const SHOW_USER_CREATE_MODAL = "SHOW_USER_CREATE_MODAL"
export const HIDE_USER_CREATE_MODAL = "HIDE_USER_CREATE_MODAL"

export const CREATION_PENDING = "CREATION_PENDING"
export const CREATION_SUCCESS = "CREATION_SUCCESS"
export const CREATION_ERROR = "CREATION_ERROR"

export function getShowUserCreateModalAction(){
	return {
		type: SHOW_USER_CREATE_MODAL
	}
}

export function getHideUserCreateModalAction(){
	return {
		type: HIDE_USER_CREATE_MODAL
	}
}

export function getCreationPendingAction(){
	return {
		type: CREATION_PENDING
	}
}

export function getCreationSuccessAction(){
	return {
		type: CREATION_SUCCESS
	}
}

export function getCreationErrorAction(error){
	return {
		type: CREATION_ERROR,
		saveError: error
	}
}

export function createNewUser(newUserID, newUserName, newPassword, newIsAdministrator, token){

	return dispatch => {

		// build object to pass to api
		const newUser = {
			userID: newUserID,
			userName: newUserName,
			password: newPassword,
			isAdministrator: newIsAdministrator
		}

		// queue pending action
		dispatch(getCreationPendingAction())

		// build request to rest api
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(newUser)
		}

		// send request
		fetch("https://localhost/users", requestOptions)
			.then(handleFetchResponse)
			.then(() => {
				const action = getCreationSuccessAction()
				dispatch(action)
			})
			.catch(error => {
				dispatch(getCreationErrorAction(error))
			})
	}
}

export function updateUser(userID, userName, password, isAdministrator, token, callback) {

	if (!userID || !token) callback("no userID or token given")

	// compose request body
	let reqBody = {}
	if (userName) reqBody.userName = userName
	if (password) reqBody.password = password
	reqBody.isAdministrator = isAdministrator

	// build request to rest api for deleting user
	const requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify(reqBody)
	}

	// send request
	fetch("https://localhost/users/" + userID, requestOptions)
		.then(handleFetchResponse)
		.then(resBody => {
			callback(null, resBody)
		})
		.catch(error => {
			callback(error)
		})
}

export function deleteUser(userID, token, callback) {

	if (!userID || !token) return callback("no userID or token given")

	// build request to rest api for deleting user
	const requestOptions = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}

	// send request
	fetch("https://localhost/users/" + userID, requestOptions)
		.then(res => {
			if (res.ok) {
				return callback(null, true)
			}
		})
}

function handleFetchResponse(res) {

	return res.text().then(text => {

		const resBody = text && JSON.parse(text)

		console.log(resBody)

		if(!res.ok){
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		}
		
		return resBody
	})
}