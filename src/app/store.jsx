import { configureStore } from '@reduxjs/toolkit'
import { appHeaderSlice } from '../features/appHeader/appHeaderSlice';
import { apiProjectSlice } from '../features/projectSlice';
import { apiImageLibrarySlice } from '../features/imageLibrarySlice';
import { apiRabbitHoleSlice } from '../features/rabbitHoleSlice';
import { apiSolutionSlice } from '../features/solutionSlice';

export const store = configureStore({
  reducer: {
    appHeader: appHeaderSlice.reducer,
    [apiProjectSlice.reducerPath]: apiProjectSlice.reducer,
    [apiImageLibrarySlice.reducerPath]: apiImageLibrarySlice.reducer,
    [apiRabbitHoleSlice.reducerPath]: apiRabbitHoleSlice.reducer,
    [apiSolutionSlice.reducerPath]: apiSolutionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiProjectSlice.middleware)
      .concat(apiImageLibrarySlice.middleware)
      .concat(apiRabbitHoleSlice.middleware)
      .concat(apiSolutionSlice.middleware);
  }
})