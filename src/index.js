import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/RootReducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { BrowserRouter } from 'react-router-dom'
import './fontAwesome/css/all.css'

const middlewares = [thunk]

const persistConfig = {
	key: 'root',
	storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

//const store = createStore(persistedReducer, applyMiddleware(...middlewares))
const store = createStore(rootReducer, applyMiddleware(...middlewares))
let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Provider store={store}>
			{/*<PersistGate loading={null} persistor={persistor}>*/}
				<App />
			{/*</PersistGate>*/}
		</Provider>
	</BrowserRouter>
)