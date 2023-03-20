// STORE
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import taskList from './slices/taskList';
import taskContent from './slices/taskContentList';
import stepContent from './slices/stepContentList';

const rootReducer = combineReducers({
  taskList,
  taskContent,
  stepContent,
});

const logger = createLogger();
let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const rootStore = configureStore({
  reducer: rootReducer,
  // middleware: middleware,
});

// export default rootStore;
