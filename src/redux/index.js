// STORE
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskList from './taskList';

const rootReducer = combineReducers({
  taskList,
});

const rootStore = configureStore({
  reducer: rootReducer,
});

export default rootStore;
