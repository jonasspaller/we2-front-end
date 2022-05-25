import { combineReducers } from "redux"

import showLoginModalReducer from './showLoginModalReducer'

const rootReducer = combineReducers({
	showLoginModal: showLoginModalReducer
})

export default rootReducer