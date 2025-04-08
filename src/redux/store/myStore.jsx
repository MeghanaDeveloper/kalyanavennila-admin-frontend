

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from '../slices/userSlice'



const rootReducer = combineReducers({
        userReducer
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer : persistedReducer
})

export const myPersistor = persistStore(Store)