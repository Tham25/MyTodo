// STORE
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskList from './taskList';
import taskContent from './taskContentList';

const rootReducer = combineReducers({
  taskList,
  taskContent,
});

const rootStore = configureStore({
  reducer: rootReducer,
});

export default rootStore;
