import { configureStore } from '@reduxjs/toolkit'
import { appHeaderSlice } from '../features/appHeader/appHeaderSlice';
import { apiProjectSlice } from '../features/projectSlice';

export const store = configureStore({
  reducer: {
    appHeader: appHeaderSlice.reducer,
    [apiProjectSlice.reducerPath]: apiProjectSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiProjectSlice.middleware)
  }
})