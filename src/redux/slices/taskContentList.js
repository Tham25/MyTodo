import { createSlice } from '@reduxjs/toolkit';
import { getDataFromStorage, setDataToStorage } from '../../localStorage';
import { fDateString } from '../../utils/formatTime';
import { deleteStepContentInList } from './stepContentList';

// dinh dang
/* {
  taskListName: 'HEHE',
  taskContentName: 'Lam het 5 bai tap',
  isComplete: true/fasel
  timeCreate: '2023-02-20'
  isImportant: true/false
  isImportant: true/false
} */

const keyStorage = 'taskContentList';

const taskContentDefault = {
  id: -1,
  taskListName: '',
  taskContentName: '',
  isComplete: false,
  timeCreate: fDateString(new Date()),
  pathName: '/',
};

const initialState = {
  error: '',
  lastId: -1,
  taskContentList: [],
  taskContentOpen: taskContentDefault,
};

const slice = createSlice({
  name: 'taskContentListSilce',
  initialState,
  reducers: {
    setTaskContentList(state, action) {
      return {
        ...state,
        lastId: action.payload.lastId,
        taskContentList: action.payload.taskContentList,
      };
    },

    setTaskContentOpen(state, action) {
      return { ...state, taskContentOpen: action.payload };
    },

    clearTaskContentOpen(state) {
      return { ...state, taskContentOpen: taskContentDefault };
    },
  },
});

export default slice.reducer;
export const { setTaskContentOpen, clearTaskContentOpen } = slice.actions;

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

export const addNewTaskContentToList =
  (taskListName, taskContentName, pathBonus = '') =>
  (dispatch, getState) => {
    const { lastId, taskContentList } = getState().taskContent;

    const nameEnglish = taskContentName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');

    const newTaskList = [
      ...taskContentList,
      {
        id: lastId + 1,
        taskListName:
          taskListName === 'Important' || taskListName === 'My day' ? 'Task Default' : taskListName,
        taskContentName,
        isComplete: false,
        timeCreate: fDateString(new Date()),
        pathName: pathBonus + nameEnglish,
        isImportant: taskListName === 'Important',
        isMyday: taskListName === 'My day',
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

export const deleteTaskContentInList =
  (taskContentId, taskListName = '') =>
  (dispatch, getState) => {
    const { lastId, taskContentList } = getState().taskContent;

    let list;
    const listTaskContentId = [];
    if (taskListName) {
      list = taskContentList.filter((item) => item.taskListName !== taskListName);
    } else {
      list = taskContentList.filter((item) => {
        if (item.id === taskContentId) {
          listTaskContentId.push(item.id);
        }
        return item.id !== taskContentId;
      });
    }

    const newData = { lastId, taskContentList: list };
    dispatch(slice.actions.setTaskContentList(newData));
    setDataToStorage(keyStorage, newData);

    // delete stepContent
    if (listTaskContentId.length) {
      dispatch(deleteStepContentInList(-1, listTaskContentId));
    }
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
