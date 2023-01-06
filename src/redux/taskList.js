import { createSlice } from '@reduxjs/toolkit';
import { getDataFromStorage, setDataToStorage } from '../localStorage';

const initialState = {
  error: '',
  taskList: [],
};

const slice = createSlice({
  name: 'taskListSilce',
  initialState,
  reducers: {
    setTaskList(state, action) {
      state.taskList = action.payload;
    },

    // addNewTask(state, action) {
    //   state.taskList = [...state.taskList, ac];
    //   console.log('setTaskList', state.taskList);
    // },

    // deleteTask(state, action) {
    //   state.taskList = state.taskList.filter((item) => item !== action.payload);
    // },
  },
});

// export const { setTaskList, addNewTask, deleteTask } = slice.actions;
export default slice.reducer;

export const getTaskList = () => (dispatch) => {
  try {
    const result = getDataFromStorage('task');

    if (result) {
      dispatch(slice.actions.setTaskList(JSON.parse(result)));
    }
  } catch (error) {
    console.log('ERROR getTaskList', error);
  }
};

export const addNewTaskToList = (nameTask) => (dispatch, getState) => {
  const { taskList } = getState().taskList;
  const count = taskList.filter((task) => {
    // const nameRg = new RegExp('^[^(]*');
    return task.name.match(/^[^(]*/)[0] === nameTask;
  }).length;

  const name = count ? `${nameTask}(${count})` : nameTask;
  const nameEnglish = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');

  const navigatePath = `task/${nameEnglish}`;

  dispatch(slice.actions.setTaskList([...taskList, { name, navigatePath }]));
  setDataToStorage('task', [...taskList, { name, navigatePath }]);
};

export const deleteTaskFromList = (task) => (dispatch, getState) => {
  const oldList = [...getState().taskList.taskList];
  const list = oldList.filter((item) => item !== task);
  dispatch(slice.actions.setTaskList(list));
  setDataToStorage('task', list);
};
