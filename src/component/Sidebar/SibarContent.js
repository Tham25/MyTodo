import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Stack } from '@mui/material';

import TaskItem from './TaskItem';
import { addNewTaskToList, getTaskList } from '../../redux/slices/taskList';
import { sidebarContent } from '../../config/sidebar';
import InputAddTask from '../InputAddTask';

function SidebarContent() {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.taskList);

  const handleAddNewTask = (e) => {
    dispatch(addNewTaskToList(e.target.value));
  };

  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  return (
    <Stack>
      {sidebarContent.map((item, index) => (
        <TaskItem key={`${item.name}-${index}`} item={item} />
      ))}
      <Divider sx={{ mt: 1, mb: 1 }} />
      {taskList.map((item, index) => (
        <TaskItem key={`${item.name}-${index}`} item={item} isCreateByUser />
      ))}
      <InputAddTask
        action={handleAddNewTask}
        placeholder="Create new list"
        sx={{ padding: '12px 20px' }}
      />
    </Stack>
  );
}

export default SidebarContent;
