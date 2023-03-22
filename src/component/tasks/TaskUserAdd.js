import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TaskContent from '../TaskContent';

function TaskUserAdd() {
  const { taskList } = useSelector((state) => state.taskList);
  const { pathname } = useLocation();

  const taskCurrent = useMemo(
    () => taskList.find((item) => item.navigatePath.split('/')[1] === pathname.split('/')[2]),
    [pathname, taskList],
  );

  return (
    <Stack sx={{ height: '100%' }}>
      <TaskContent title={taskCurrent?.name} taskName={taskCurrent?.name} note="create by user" />
    </Stack>
  );
}

export default TaskUserAdd;
