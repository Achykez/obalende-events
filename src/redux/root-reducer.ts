import { combineReducers } from "@reduxjs/toolkit"
import { baseApi } from "./baseApi"
import authSlice from "./slices/auth"

const reducers = {
    api: baseApi.reducer,
    auth: authSlice.reducer
}

export const combineReducer = combineReducers<typeof reducers>(reducers)