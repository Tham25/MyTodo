import { createSlice } from '@reduxjs/toolkit';
import { getDataFromStorage, setDataToStorage } from '../localStorage';

// dinh dang
/* {
  taskListName: 'HEHE',
  taskContentName: 'Lam het 5 bai tap',
  isComplete: true/fasel
} */

const keyStorage = 'taskContentList';

const initialState = {
  error: '',
  lastId: -1,
  taskContentList: [],
};

const slice = createSlice({
  name: 'taskContentListSilce',
  initialState,
  reducers: {
    setTaskContentList(state, action) {
      state.lastId = action.payload.lastId;
      state.taskContentList = action.payload.taskContentList;
    },
  },
});

export default slice.reducer;

export const getTaskContentList = () => (dispatch) => {
  try {
    const result = getDataFromStorage(keyStorage);

    if (result) {
      dispatch(slice.actions.setTaskContentList(JSON.parse(result)));
    }
  } catch (error) {
    console.log('ERROR getTaskList', error);
  }
};

export const addNewTaskContentToList = (taskListName, taskContentName) => (dispatch, getState) => {
  const { lastId, taskContentList } = getState().taskContent;

  const newTaskList = [{ id: lastId + 1, taskListName, taskContentName, isComplete: false }, ...taskContentList];
  // check id

  const newData = {
    lastId: lastId + 1, taskContentList: newTaskList
  }
  // luu vao storage
  
  dispatch(slice.actions.setTaskContentList(newData));
  
  setDataToStorage(keyStorage, newData);
};

export const deleteTaskContentInList = (task) => (dispatch, getState) => {
  const { lastId, taskContentList } = getState().taskContent;

  const list = taskContentList.filter((item) => item.toString() !== task.toString());

  const newData = {lastId, taskContentList: list};
  dispatch(slice.actions.setTaskContentList(newData));
  setDataToStorage(keyStorage, newData);
};

export const updateTaskContentInList = (task, newState) => (dispatch, getState) => {
  const { lastId, taskContentList } = getState().taskContent;

  const list = taskContentList.map((item) => {
    if (item.taskListName === task.taskListName && item.taskContentName === task.taskContentName) {
      return { ...item, isComplete: newState };
    }
    return item;
  });


  const newData = {
    lastId, taskContentList: list
  }

  dispatch(slice.actions.setTaskContentList(newData));

  setDataToStorage(keyStorage, newData);
};
