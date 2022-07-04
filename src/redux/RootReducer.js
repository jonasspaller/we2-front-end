import { combineReducers } from "redux"
import authenticationReducer from "./authentication/AuthenticationReducer"
import userManagementReducer from "./user/UserManagementReducer"
import forumThreadReducer from "./forum/ForumThreadReducer"

const RootReducer = combineReducers({
	authenticationReducer,
	userManagementReducer,
	forumThreadReducer
})

export default RootReducer