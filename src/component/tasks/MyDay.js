import { Box, Stack } from '@mui/material';
import HeaderTaskContent from '../HeaderTaskContent';
import TaskContentList from '../TaskContentList';

function MyDay() {
  // const [isOpenTaskSteps, setIsOpenTaskSteps] = useState(false);

  // const hanldeOpenTaskSteps = (item) => {
  //   console.log("openopen open", item);
  //   setIsOpenTaskSteps(true);
  // }

  return (
    <Stack direction="row" sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, padding: '16px 24px' }}>
        <HeaderTaskContent title="My day" />
        <TaskContentList taskListName="My day" />
      </Box>
    </Stack>
  );
}

export default MyDay;
