import config from "../../config.json"

export const POPULATE_ALL_USERS = "POPULATE_ALL_USERS"

export const SHOW_USER_CREATE_MODAL = "SHOW_USER_CREATE_MODAL"
export const HIDE_USER_CREATE_MODAL = "HIDE_USER_CREATE_MODAL"

export const CREATION_PENDING = "CREATION_PENDING"
export const CREATION_SUCCESS = "CREATION_SUCCESS"
export const CREATION_ERROR = "CREATION_ERROR"

export const DELETE_USER = "DELETE_USER"

export const SHOW_UPDATE_MODAL = "SHOW_UPDATE_MODAL"
export const HIDE_UPDATE_MODAL = "HIDE_UPDATE_MODAL"

export const UPDATE_PENDING = "UPDATE_PENDING"
export const UPDATE_SUCCESS = "UPDATE_SUCCESS"
export const UPDATE_ERROR = "UPDATE_ERROR"

export function getPopulateAllUsersAction(allUsers){
	return {
		type: POPULATE_ALL_USERS,
		users: allUsers
	}
}

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

export function getCreationSuccessAction(newUser){
	return {
		type: CREATION_SUCCESS,
		user: newUser
	}
}

export function getCreationErrorAction(error){
	return {
		type: CREATION_ERROR,
		saveError: error
	}
}

export function getDeleteUserAction(userID){
	return {
		type: DELETE_USER,
		userToDelete: userID
	}
}

export function getShowUpdateModalAction(user){
	return {
		type: SHOW_UPDATE_MODAL,
		userToUpdate: user
	}
}

export function getHideUpdateModalAction(){
	return {
		type: HIDE_UPDATE_MODAL
	}
}

export function getUpdatePendingAction(){
	return {
		type: UPDATE_PENDING
	}
}

export function getUpdateSuccessAction(user){
	return {
		type: UPDATE_SUCCESS,
		updatedUser: user
	}
}

export function getUpdateErrorAction(error){
	return {
		type: UPDATE_ERROR,
		updateError: error
	}
}

export function getAllUsers(token, callback){

	// build request to rest api for showing all users
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}

	// send request
	fetch(config.SERVER_URL + "/users", requestOptions)
		.then(response => response.json())
		.then(users => {
			callback(users)
		})
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
		fetch(config.SERVER_URL + "/users", requestOptions)
			.then(handleFetchResponse)
			.then(newUser => {
				const action = getCreationSuccessAction(newUser)
				dispatch(action)
			})
			.catch(error => {
				dispatch(getCreationErrorAction(error))
			})
	}
}

export function updateUser(userID, userName, password, isAdministrator, token) {

	return dispatch => {

		// compose request body
		let reqBody = {}
		if (userName) reqBody.userName = userName
		if (password) reqBody.password = password
		reqBody.isAdministrator = isAdministrator

		// build request to rest api for updating user
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(reqBody)
		}

		// send request
		fetch(config.SERVER_URL + "/users/" + userID, requestOptions)
			.then(handleFetchResponse)
			.then(resBody => {
				const action = getUpdateSuccessAction(resBody)
				dispatch(action)
			})
			.catch(error => {
				const action = getUpdateErrorAction(error)
				dispatch(action)
			})
	}
}

export function deleteUser(userID, token) {

	return dispatch => {

		// build request to rest api for deleting user
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}

		// send request
		fetch(config.SERVER_URL + "/users/" + userID, requestOptions)
			.then(handleFetchResponse)
			.then(() => {
				const action = getDeleteUserAction(userID)
				dispatch(action)
			})
			.catch(error => {
				console.log(error)
			})
	}
}

function handleFetchResponse(res) {

	return res.text().then(text => {

		const resBody = text && JSON.parse(text)

		if(!res.ok){
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		}
		
		return resBody
	})
}