export function updateUser(userID, userName, password, isAdministrator, token, callback){

	if(!userID || !token) return callback("no userID or token given")

	// compose request body
	let reqBody = {}
	if(userName) reqBody.userName = userName
	if(password) reqBody.password = password
	reqBody.isAdministrator = isAdministrator

	console.log(reqBody)

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
	//fetch("https://localhost/users/" + userID, requestOptions)
	//.then(res => {
	//	if(res.ok){
	//		return callback(null, true)
	//	}
	//})
}

export function deleteUser(userID, token, callback){

	if(!userID || !token) return callback("no userID or token given")

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
		if(res.ok){
			return callback(null, true)
		}
	})
}