import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/todos/loginslicer';

// Cria a store para global state Redux

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;