import config from "../../config.json"

export const POPULATE_FORUMTHREADS_TO_STATE = "POPULATE_FORUMTHREADS_TO_STATE"

export const SHOW_CREATE_THREAD_MODAL = "SHOW_CREATE_THREAD_MODAL"
export const HIDE_CREATE_THREAD_MODAL = "HIDE_CREATE_THREAD_MODAL"

export const THREAD_PENDING = "THREAD_PENDING"

export const THREAD_CREATION_SUCCESS = "THREAD_CREATION_SUCCESS"
export const THREAD_CREATION_ERROR = "THREAD_CREATION_ERROR"

export const SHOW_EDIT_THREAD_MODAL = "SHOW_EDIT_THREAD_MODAL"
export const HIDE_EDIT_THREAD_MODAL = "HIDE_EDIT_THREAD_MODAL"

export const THREAD_UPDATE_SUCCESS = "THREAD_UPDATE_SUCCESS"
export const THREAD_UPDATE_ERROR = "THREAD_UPDATE_ERROR"

export function getPopulateAllThreadsAction(allThreads) {
	return {
		type: POPULATE_FORUMTHREADS_TO_STATE,
		threads: allThreads
	}
}

export function getShowCreateModalAction() {
	return {
		type: SHOW_CREATE_THREAD_MODAL
	}
}

export function getHideCreateModalAction() {
	return {
		type: HIDE_CREATE_THREAD_MODAL
	}
}

export function getPendingAction() {
	return {
		type: THREAD_PENDING
	}
}

export function getCreationSuccessAction(newThread) {
	return {
		type: THREAD_CREATION_SUCCESS,
		thread: newThread
	}
}

export function getCreationErrorAction(error) {
	return {
		type: THREAD_CREATION_ERROR,
		saveError: error
	}
}

export function getShowEditModalAction(thread) {
	return {
		type: SHOW_EDIT_THREAD_MODAL,
		thread: thread
	}
}

export function getHideEditModalAction() {
	return {
		type: HIDE_EDIT_THREAD_MODAL
	}
}

export function getUpdateSuccessAction(thread){
	return {
		type: THREAD_UPDATE_SUCCESS,
		updatedThread: thread
	}
}

export function getUpdateErrorAction(error){
	return {
		type: THREAD_UPDATE_ERROR,
		updateError: error
	}
}

export function getAllForumThreads(callback) {

	// build request to rest api for showing all users
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	// send request
	fetch(config.SERVER_URL + "/forumThreads", requestOptions)
		.then(response => response.json())
		.then(threads => {
			callback(threads)
		})
}

export function createNewForumThread(name, description, token) {

	return dispatch => {

		// queue pending action
		dispatch(getPendingAction())

		// build object to pass to api
		const newThread = {
			name: name,
			description: description
		}

		// build request to rest api
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(newThread)
		}

		// send request
		fetch(config.SERVER_URL + "/forumThreads", requestOptions)
			.then(handleFetchResponse)
			.then(newThread => {
				const action = getCreationSuccessAction(newThread)
				dispatch(action)
			})
			.catch(error => {
				dispatch(getCreationErrorAction(error))
			})
	}
}

export function updateForumThread(id, name, description, token) {

	return dispatch => {

		// queue pending action
		dispatch(getPendingAction())

		// compose request body
		let reqBody = {}
		if (name) reqBody.name = name
		if (description) reqBody.description = description

		// build request to rest api for updating thread
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(reqBody)
		}

		// send request
		fetch(config.SERVER_URL + "/forumThreads/" + id, requestOptions)
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

function handleFetchResponse(res) {

	return res.text().then(text => {

		const resBody = text && JSON.parse(text)

		if (!res.ok) {
			const error = resBody.Error || res.statusText
			return Promise.reject(error)
		}

		return resBody
	})
}