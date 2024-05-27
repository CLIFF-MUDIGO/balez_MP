// store.js
import { configureStore } from '@reduxjs/toolkit';
import loadersReducer from './loadersSlice'; // Correct import for the default export
import usersReducer from './usersSlice'; // Correct import for the default export

const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducer,
  },
});

export default store;
