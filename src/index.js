import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/RootReducer'
import thunk from 'redux-thunk'

const middlewares = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)