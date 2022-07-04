import * as forumThreadActions from './ForumThreadActions'

const initialState = {
	forumThreads: [],
	error: null
}

export default function ForumThreadReducer(state = initialState, action) {

	switch (action.type) {
		case forumThreadActions.POPULATE_FORUMTHREADS_TO_STATE:
			return {
				...state,
				forumThreads: action.threads
			}
		default:
			return state
	}
}