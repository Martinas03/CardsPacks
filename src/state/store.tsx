import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {packsReducer} from "./packs-reducer";
import {packSearchReducer} from "./pack-search-reducer";
import {cardsReducer} from "./cards-reducer";
import {cardsSearchReducer} from "./card-search-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    packsReducer: packsReducer,
    packSearchReducer: packSearchReducer,
    cards: cardsReducer,
    searchCards: cardsSearchReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;