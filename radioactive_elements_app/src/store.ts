import { combineReducers, configureStore } from "@reduxjs/toolkit";
import elementsReducer from './slices/elementsSlice'
import userReducer from './slices/userSlice'
import elementReducer from './slices/elementSlice'
import decayReducer from './slices/decaySlice'
import decaysReducer from './slices/decaysSlice'

export const store = configureStore ({
    reducer: combineReducers({
        elements: elementsReducer,
        user: userReducer,
        element: elementReducer,
        decay: decayReducer,
        decays: decaysReducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch