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

export const DELETE_THREAD = "DELETE_THREAD"
export const SHOW_DELETE_THREAD_CONFIRM = "SHOW_DELETE_THREAD_CONFIRM"
export const HIDE_DELETE_THREAD_CONFIRM = "HIDE_DELETE_THREAD_CONFIRM"

export const SHOW_SINGLE_THREAD = "SHOW_SINGLE_THREAD"
export const SHOW_THREAD_OVERVIEW = "SHOW_THREAD_OVERVIEW"

export const SHOW_CREATE_MESSAGE_MODAL = "SHOW_CREATE_MESSAGE_MODAL"
export const HIDE_CREATE_MESSAGE_MODAL = "HIDE_CREATE_MESSAGE_MODAL"

export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS"
export const CREATE_MESSAGE_ERROR = "CREATE_MESSAGE_ERROR"

export const POPULATE_FORUMMESSAGES_TO_STATE = "POPULATE_FORUMMESSAGES_TO_STATE"

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

export function getDeleteThreadAction(threadID){
	return {
		type: DELETE_THREAD,
		threadToDelete: threadID
	}
}

export function getShowConfirmAction(){
	return {
		type: SHOW_DELETE_THREAD_CONFIRM
	}
}

export function getHideConfirmAction(){
	return {
		type: HIDE_DELETE_THREAD_CONFIRM,
		confirmQuestion: null
	}
}

export function getShowSingleThreadAction(thread){
	return {
		type: SHOW_SINGLE_THREAD,
		thread: thread
	}
}

export function getShowThreadOverviewAction(){
	return {
		type: SHOW_THREAD_OVERVIEW
	}
}

export function getShowCreateMessageModalAction(){
	return {
		type: SHOW_CREATE_MESSAGE_MODAL
	}
}

export function getHideCreateMessageModalAction(){
	return {
		type: HIDE_CREATE_MESSAGE_MODAL
	}
}

export function getCreateMessageSuccessAction(message){
	return {
		type: CREATE_MESSAGE_SUCCESS,
		message: message
	}
}

export function getCreateMessageErrorAction(error){
	return {
		type: CREATE_MESSAGE_ERROR,
		error: error
	}
}

export function getPopulateAllMessagesAction(allMessages) {
	return {
		type: POPULATE_FORUMMESSAGES_TO_STATE,
		messages: allMessages
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

export function deleteThread(threadID, token) {

	return dispatch => {

		// build request to rest api for deleting thread
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}

		// send request
		fetch(config.SERVER_URL + "/forumThreads/" + threadID, requestOptions)
			.then(handleFetchResponse)
			.then(() => {
				const action = getDeleteThreadAction(threadID)
				dispatch(action)
			})
			.catch(error => {
				console.log(error)
			})
	}
}

export function getAllMessagesFromThread(threadID, callback){

	// build request to rest api for deleting thread
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	// send request
	fetch(config.SERVER_URL + "/forumThreads/" + threadID + "/forumMessages", requestOptions)
		.then(handleFetchResponse)
		.then(messages => {
			messages.length === 0 ? callback(null, null) : callback(null, messages)
		})
		.catch(error => {
			callback(error)
		})
}

export function createMessage(threadID, title, text, token){

	return dispatch => {

		// check if required title is given
		if(!title) return dispatch(getCreateMessageErrorAction("Ein Text wird ben&ouml;tigt"))

		// queue pending action
		dispatch(getPendingAction())

		// compose request body
		let reqBody = {}
		reqBody.forumThreadID = threadID
		if (title) reqBody.title = title
		reqBody.text = text

		// build request to rest api for updating thread
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(reqBody)
		}

		// send request
		fetch(config.SERVER_URL + "/forumMessages", requestOptions)
			.then(handleFetchResponse)
			.then(resBody => {
				const action = getCreateMessageSuccessAction(resBody)
				dispatch(action)
			})
			.catch(error => {
				const action = getCreateMessageErrorAction(error)
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