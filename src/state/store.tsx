import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;