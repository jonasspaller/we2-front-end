export const UPDATE_PENDING = "UPDATE_PENDING"
export const UPDATE_SUCCESS = "UPDATE_SUCCESS"
export const UPDATE_ERROR = "UPDATE_ERROR"

export function getUpdatePendingAction() {
	return {
		type: UPDATE_PENDING
	}
}

export function getUpdateSuccessAction(userToUpdate) {
	return {
		type: UPDATE_SUCCESS,
		updUser: userToUpdate
	}
}

export function getUpdateErrorAction(err) {
	return {
		type: UPDATE_ERROR,
		updateError: err
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

	if (!res.ok) {
		return Promise.reject("Etwas ist schiefgelaufen")
	}

	const resBody = res.json()
	console.log(resBody)

	return resBody
}