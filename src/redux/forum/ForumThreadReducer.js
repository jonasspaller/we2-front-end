import * as forumThreadActions from './ForumThreadActions'

const initialState = {
	forumThreads: [],
	error: null,
	showCreateModal: false,
	pending: false,
	showEditModal: false,
	threadToEdit: null,
	showDeleteThreadConfirm: false,
	showSingleThread: null,
	showCreateMessageModal: false,
	threadMessages: []
}

export default function ForumThreadReducer(state = initialState, action) {

	switch (action.type) {
		case forumThreadActions.POPULATE_FORUMTHREADS_TO_STATE:
			return {
				...state,
				forumThreads: action.threads
			}
		case forumThreadActions.SHOW_CREATE_THREAD_MODAL:
			return {
				...state,
				showCreateModal: true
			}
		case forumThreadActions.HIDE_CREATE_THREAD_MODAL:
			return {
				...state,
				showCreateModal: false
			}
		case forumThreadActions.THREAD_PENDING:
			return {
				...state,
				pending: true
			}
		case forumThreadActions.THREAD_CREATION_SUCCESS:
			return {
				...state,
				showCreateModal: false,
				pending: false,
				error: null,
				forumThreads: state.forumThreads.concat(action.thread)
			}
		case forumThreadActions.THREAD_CREATION_ERROR:
			return {
				...state,
				pending: false,
				error: action.saveError
			}
		case forumThreadActions.SHOW_EDIT_THREAD_MODAL:
			return {
				...state,
				showEditModal: true,
				threadToEdit: action.thread,
				error: null
			}
		case forumThreadActions.HIDE_EDIT_THREAD_MODAL:
			return {
				...state,
				showEditModal: false,
				threadToEdit: null
			}
		case forumThreadActions.THREAD_UPDATE_SUCCESS:
			return {
				...state,
				showEditModal: false,
				pending: false,
				error: null,
				forumThreads: state.forumThreads.map(thread => (thread._id === action.updatedThread._id) ? action.updatedThread : thread)
			}
		case forumThreadActions.THREAD_UPDATE_ERROR:
			return {
				...state,
				pending: false,
				error: action.updateError
			}
		case forumThreadActions.DELETE_THREAD:
			return {
				...state,
				forumThreads: state.forumThreads.filter(thread => thread._id !== action.threadToDelete)
			}
		case forumThreadActions.SHOW_DELETE_THREAD_CONFIRM:
			return {
				...state,
				showDeleteThreadConfirm: true
			}
		case forumThreadActions.HIDE_DELETE_THREAD_CONFIRM:
			return {
				...state,
				showDeleteThreadConfirm: false
			}
		case forumThreadActions.SHOW_SINGLE_THREAD:
			return {
				...state,
				showSingleThread: action.thread
			}
		case forumThreadActions.SHOW_THREAD_OVERVIEW:
			return {
				...state,
				showSingleThread: null,
				threadMessages: []
			}
		case forumThreadActions.SHOW_CREATE_MESSAGE_MODAL:
			return {
				...state,
				showCreateMessageModal: true
			}
		case forumThreadActions.HIDE_CREATE_MESSAGE_MODAL:
			return {
				...state,
				showCreateMessageModal: false
			}
		case forumThreadActions.CREATE_MESSAGE_SUCCESS:
			return {
				...state,
				showCreateMessageModal: false,
				pending: false,
				error: null,
				threadMessages: state.threadMessages.concat(action.message)
			}
		case forumThreadActions.CREATE_MESSAGE_ERROR:
			return {
				...state,
				error: action.error
			}
		case forumThreadActions.POPULATE_FORUMMESSAGES_TO_STATE:
			return {
				...state,
				threadMessages: action.messages
			}
		default:
			return state
	}
}