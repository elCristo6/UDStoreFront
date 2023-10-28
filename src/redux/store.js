// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importa el reducer de autenticación que creaste

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Otros reducers aquí si los tienes
  },
});

export default store;
