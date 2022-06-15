import { combineReducers } from "redux"
import authenticationReducer from "./authentication/authenticationReducer"

const rootReducer = combineReducers({
	authenticationReducer
})

export default rootReducer