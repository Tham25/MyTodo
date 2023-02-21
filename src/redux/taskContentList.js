import { createSlice } from '@reduxjs/toolkit';
import { getDataFromStorage, setDataToStorage } from '../localStorage';
import { fDateString } from '../utils/formatTime';

// dinh dang
/* {
  taskListName: 'HEHE',
  taskContentName: 'Lam het 5 bai tap',
  isComplete: true/fasel
  timeCreate: '2023-02-20'
} */

const keyStorage = 'taskContentList';

const initialState = {
  error: '',
  lastId: -1,
  taskContentList: [],
  taskContentOpenId: -1,
};

const slice = createSlice({
  name: 'taskContentListSilce',
  initialState,
  reducers: {
    setTaskContentList(state, action) {
      state.lastId = action.payload.lastId;
      state.taskContentList = action.payload.taskContentList;
    },

    setTaskContentOpenId(state, action) {
      state.taskContentOpenId = action.payload;
    },

    clearTaskContentOpenId(state) {
      state.taskContentOpenId = -1;
    },
  },
});

export default slice.reducer;
export const { setTaskContentOpenId, clearTaskContentOpenId } = slice.actions;

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

  const newTaskList = [
    ...taskContentList,
    {
      id: lastId + 1,
      taskListName,
      taskContentName,
      isComplete: false,
      timeCreate: fDateString(new Date()),
    },
  ];
  // check id

  const newData = {
    lastId: lastId + 1,
    taskContentList: newTaskList,
  };

  // luu vao storage

  dispatch(slice.actions.setTaskContentList(newData));

  setDataToStorage(keyStorage, newData);
};

export const deleteTaskContentInList = (taskContent) => (dispatch, getState) => {
  const { lastId, taskContentList } = getState().taskContent;

  const list = taskContentList.filter((item) => item.id !== taskContent.id);

  const newData = { lastId, taskContentList: list };
  dispatch(slice.actions.setTaskContentList(newData));
  setDataToStorage(keyStorage, newData);
};

export const updateTaskContentInList = (updateTaskContent) => (dispatch, getState) => {
  const { lastId, taskContentList } = getState().taskContent;

  const list = taskContentList.map((item) => {
    if (item.id === updateTaskContent.id) {
      return updateTaskContent;
    }
    return item;
  });

  const newData = {
    lastId,
    taskContentList: list,
  };

  dispatch(slice.actions.setTaskContentList(newData));

  setDataToStorage(keyStorage, newData);
};
