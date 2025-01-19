import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { combineReducer } from './root-reducer';


export const makeStore = () => {
  return configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']