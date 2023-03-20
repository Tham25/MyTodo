import { Stack } from '@mui/material';
import TaskContent from '../TaskContent';

function MyDay() {
  return (
    <Stack sx={{ height: '100%' }}>
      <TaskContent title="My day" taskName="My day" />
    </Stack>
  );
}

export default MyDay;
