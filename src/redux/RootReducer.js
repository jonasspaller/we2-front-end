import { combineReducers } from "redux"
import authenticationReducer from "./authentication/AuthenticationReducer"
import userManagementReducer from "./user/UserManagementReducer"

const RootReducer = combineReducers({
	authenticationReducer,
	userManagementReducer
})

export default RootReducer