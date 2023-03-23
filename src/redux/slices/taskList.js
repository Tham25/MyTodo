import { createSlice } from '@reduxjs/toolkit';
import { getDataFromStorage, setDataToStorage } from '../../localStorage';
import { deleteTaskContentInList } from './taskContentList';

const keyStorage = 'taskList';

const initialState = {
  error: '',
  taskList: [],
};

// {name: 'd', navigatePath: 'task/d', isActive: false}
const taskSlice = createSlice({
  name: 'taskListSilce',
  initialState,
  reducers: {
    setTaskList(state, action) {
      state.taskList = action.payload;
    },
  },
});

export default taskSlice.reducer;

export const getTaskList = () => (dispatch) => {
  try {
    const result = getDataFromStorage(keyStorage);

    if (result) {
      dispatch(taskSlice.actions.setTaskList(JSON.parse(result)));
    }
  } catch (error) {
    console.log('ERROR getTaskList', error);
  }
};

export const addNewTaskToList = (nameTask) => (dispatch, getState) => {
  const { taskList } = getState().taskList;
  const count = taskList.filter((task) => {
    return task.name.match(/^[^(]*/)[0] === nameTask;
  }).length;

  const name = count ? `${nameTask}(${count})` : nameTask;
  const nameEnglish = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');

  const navigatePath = `MyTodo/task/${nameEnglish}`; // TaskUserAdd

  dispatch(taskSlice.actions.setTaskList([...taskList, { name, navigatePath }]));
  setDataToStorage(keyStorage, [...taskList, { name, navigatePath }]);
};

export const deleteTaskInList = (task) => (dispatch, getState) => {
  const oldList = [...getState().taskList.taskList];

  const list = oldList.filter((item) => item.name !== task.name);
  dispatch(taskSlice.actions.setTaskList(list));
  setDataToStorage(keyStorage, list);

  // delete task content
  dispatch(deleteTaskContentInList(-1, task.name));
};
