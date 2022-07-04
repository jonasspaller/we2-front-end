import config from "../../config.json"

export const POPULATE_FORUMTHREADS_TO_STATE = "POPULATE_FORUMTHREADS_TO_STATE"

export function getPopulateAllThreadsAction(allThreads){
	return {
		type: POPULATE_FORUMTHREADS_TO_STATE,
		threads: allThreads
	}
}

export function getAllForumThreads(callback){

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