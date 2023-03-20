import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import TaskContent from '../TaskContent';

function TaskUserAdd() {
  const { taskList } = useSelector((state) => state.taskList);
  console.log('taskList', taskList);

  return (
    <Stack sx={{ height: '100%' }}>
      <TaskContent title="Task Default" taskName="Task Default" />
    </Stack>
  );
}

export default TaskUserAdd;
