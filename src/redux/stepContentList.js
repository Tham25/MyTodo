import { createSlice } from '@reduxjs/toolkit';
import { getDataFromStorage, setDataToStorage } from '../localStorage';

// dinh dang
/* {
  taskContentId: 1,
  id: 0,
  stepContentName: 'kkka'
  isComplete: true/fasel
} */

const keyStorage = 'stepContentList';

const initialState = {
  error: '',
  lastId: -1,
  isOpen: false,
  stepContentList: [],
};

const slice = createSlice({
  name: 'stepContentListSilce',
  initialState,
  reducers: {
    setStepContentList(state, action) {
      state.lastId = action.payload.lastId;
      state.stepContentList = action.payload.stepContentList;
    },

    openStepContent(state) {
      state.isOpen = true;
    },

    closeStepContent(state) {
      state.isOpen = false;
    },
  },
});

export default slice.reducer;
export const { openStepContent, closeStepContent } = slice.actions;

export const getStepContentList = () => (dispatch) => {
  try {
    const result = getDataFromStorage(keyStorage);

    if (result) {
      // const resultFilter = result.stepContentList.filter(
      //   (item) => item.taskContentId === taskContentId,
      // );
      // console.log('getStepContentList', resultFilter, taskContentId);
      dispatch(slice.actions.setStepContentList(JSON.parse(result)));
    }
  } catch (error) {
    console.log('ERROR getTaskList', error);
  }
};

export const addNewStepContentToList = (taskContentId, stepContentName) => (dispatch, getState) => {
  const { lastId, stepContentList } = getState().stepContent;

  const newTaskList = [
    ...stepContentList,
    { id: lastId + 1, taskContentId, stepContentName, isComplete: false },
  ];
  // check id

  const newData = {
    lastId: lastId + 1,
    stepContentList: newTaskList,
  };
  // luu vao storage

  dispatch(slice.actions.setStepContentList(newData));

  setDataToStorage(keyStorage, newData);
};

export const deleteStepContentInList = (stepContentId) => (dispatch, getState) => {
  const { lastId, stepContentList } = getState().stepContent;

  const list = stepContentList.filter((item) => item.id !== stepContentId);

  const newData = { lastId, stepContentList: list };

  dispatch(slice.actions.setStepContentList(newData));
  setDataToStorage(keyStorage, newData);
};

export const updateStepContentInList = (updateStepContent) => (dispatch, getState) => {
  const { lastId, stepContentList } = getState().stepContent;

  const list = stepContentList.map((item) => {
    if (item.id === updateStepContent.id) {
      return updateStepContent;
    }
    return item;
  });

  const newData = {
    lastId,
    stepContentList: list,
  };

  dispatch(slice.actions.setStepContentList(newData));

  setDataToStorage(keyStorage, newData);
};
