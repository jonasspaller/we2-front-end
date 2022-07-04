import * as forumThreadActions from './ForumThreadActions'

const initialState = {
	forumThreads: [],
	error: null,
	showCreateModal: false,
	pending: false,
	showEditModal: false,
	threadToEdit: null,
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
		default:
			return state
	}
}