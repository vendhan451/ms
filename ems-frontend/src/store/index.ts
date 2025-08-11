import { configureStore } from '@reduxjs/toolkit';
import { employeesReducer } from '../features/employees/employeesSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;