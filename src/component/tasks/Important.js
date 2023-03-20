import { Box, Stack } from '@mui/material';
import TaskContent from '../TaskContent';

function Important() {
  return (
    <Stack sx={{ height: '100%' }}>
      <TaskContent title="Important" taskName="Important" />
    </Stack>
  );
}

export default Important;
