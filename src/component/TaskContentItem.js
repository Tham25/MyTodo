import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import CheckBoxCustom from './CheckBoxCustom';
import { getStepContentList, openStepContent } from '../redux/stepContentList';
import { setTaskContentOpenId, updateTaskContentInList } from '../redux/taskContentList';

function TaskContentItem({ taskContentItem }) {
  const dispatch = useDispatch();
  const { taskContentOpenId } = useSelector((state) => state.taskContent);
  const textDecoration = taskContentItem.isComplete ? 'line-through' : 'none';

  const handleChange = (e) => {
    e.stopPropagation();
    dispatch(updateTaskContentInList({ ...taskContentItem, isComplete: e.target.checked }));
  };

  const handleOpenStepList = () => {
    dispatch(openStepContent());
    dispatch(setTaskContentOpenId(taskContentItem.id));
    dispatch(getStepContentList());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '36px',
        backgroundColor: taskContentItem.id === taskContentOpenId ? '#EFF6FC' : '#fff',
        boxShadow: '1px 2px 3px #d7d7d7, -1px 0px 1px #EEEDEC',
        borderRadius: '3px',
        mt: '8px',
        p: '8px 16px',
        justifyContent: 'start',
        textTransform: 'none',
        color: '#000',
        '&:hover': {
          backgroundColor: taskContentItem.id === taskContentOpenId ? '#EFF6FC' : '#F5F5F5',
        },
        cursor: 'pointer',
      }}
    >
      <CheckBoxCustom checkedStatus={taskContentItem.isComplete} handleChange={handleChange} />
      <Button
        disableRipple
        onClick={handleOpenStepList}
        sx={{
          p: 0,
          ml: '16px',
          fontSize: '14px',
          textDecoration,
          textTransform: 'none',
          color: '#000',
          '&:hover': { backgroundColor: 'transparent', textDecoration },
          justifyContent: 'start',
          flex: 1,
          height: '100%',
          fontWeight: 400,
        }}
      >
        {taskContentItem.taskContentName}
      </Button>
    </Box>
  );
}

export default TaskContentItem;
