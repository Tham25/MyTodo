import { Stack } from '@mui/material';
import TaskContent from '../TaskContent';

function TaskDefault() {
  return (
    <Stack sx={{ height: '100%' }}>
      <TaskContent title="Task Default" taskName="Task Default" />
    </Stack>
  );
}

export default TaskDefault;
