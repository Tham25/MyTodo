import { Box } from '@mui/material';
import HeaderTaskContent from '../HeaderTaskContent';
import TaskContentList from '../TaskContentList';

function MyDay() {
  return (
    <Box>
      <Box>
        <HeaderTaskContent title='My day' />
        <TaskContentList taskListName="My day" />
      </Box>
      {/* phan drag content to do*/}
    </Box>
  );
}

export default MyDay;
