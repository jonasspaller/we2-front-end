import { combineReducers } from "redux"
import authenticationReducer from "./authentication/AuthenticationReducer"

const RootReducer = combineReducers({
	authenticationReducer
})

export default RootReducer