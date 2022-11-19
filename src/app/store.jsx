import { configureStore } from '@reduxjs/toolkit'
import { appHeaderSlice } from '../features/appHeader/appHeaderSlice';
import { apiProjectSlice } from '../features/projectSlice';
import { apiImageLibrarySlice } from '../features/imageLibrarySlice';

export const store = configureStore({
  reducer: {
    appHeader: appHeaderSlice.reducer,
    [apiProjectSlice.reducerPath]: apiProjectSlice.reducer,
    [apiImageLibrarySlice.reducerPath]: apiImageLibrarySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiProjectSlice.middleware)
      .concat(apiImageLibrarySlice.middleware);
  }
})