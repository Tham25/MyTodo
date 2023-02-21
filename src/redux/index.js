// STORE
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskList from './taskList';
import taskContent from './taskContentList';
import stepContent from './stepContentList';

const rootReducer = combineReducers({
  taskList,
  taskContent,
  stepContent,
});

const rootStore = configureStore({
  reducer: rootReducer,
});

export default rootStore;
