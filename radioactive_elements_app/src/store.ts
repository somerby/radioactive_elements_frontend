import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from './slices/dataSlice'

const store = configureStore ({
    reducer: combineReducers({
        ourData: dataReducer
    })
})
export default store