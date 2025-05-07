import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './features/countriesSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;