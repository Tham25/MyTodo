import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import { TbSun } from 'react-icons/tb';

import InputAddTask from '../InputAddTask';
import { addNewStepContentToList, getStepContentList } from '../../redux/slices/stepContentList';
import StepItem from './StepItem';
import FooterAction from './FooterAction';
import TaskContentItem from '../TaskContent/TaskContentItem';
import { setTaskContentOpen, updateTaskContentInList } from '../../redux/slices/taskContentList';

function StepContent() {
  const dispatch = useDispatch();
  const stepContentList = useSelector((state) => state.stepContent.stepContentList);
  const taskContentOpen = useSelector((state) => state.taskContent.taskContentOpen);

  useEffect(() => {
    dispatch(getStepContentList());
  }, [dispatch]);

  const listStep = useMemo(() => {
    return stepContentList.filter((item) => item.taskContentId === taskContentOpen?.id);
  }, [stepContentList, taskContentOpen]);

  const handleAddNewStep = (e) => {
    dispatch(addNewStepContentToList(taskContentOpen.id, e.target.value));
  };

  const handleMyday = () => {
    dispatch(updateTaskContentInList({ ...taskContentOpen, isMyday: !taskContentOpen.isMyday }));
    dispatch(setTaskContentOpen({ ...taskContentOpen, isMyday: !taskContentOpen.isMyday }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          margin: '16px 24px 0 24px',
          backgroundColor: '#fff',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <TaskContentItem
          taskContentItem={taskContentOpen}
          isTitle
          sxIcon={{ width: 20, padding: 0 }}
        />
      </Box>
      <Box
        sx={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          position: 'relative',
          flex: 1,
        }}
      >
        <Box sx={{ padding: '0px 16px 0px 24px' }}>
          <ListStep>
            {listStep.map((item, index) => (
              <StepItem key={index} stepItem={item} />
            ))}
          </ListStep>
          <InputAddTask
            action={handleAddNewStep}
            placeholder="Next step"
            sx={{
              background: '#fff',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <Button
            disableRipple
            onClick={handleMyday}
            sx={{
              mt: 1,
              backgroundColor: '#fff',
              textTransform: 'none',
              width: '100%',
              height: '52px',
              '&:hover': { backgroundColor: '#F3F2F1' },
              p: 2,
              justifyContent: 'start',
              color: taskContentOpen.isMyday ? '#2564CF' : '#605e5c',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '32px',
                mr: 2,
                justifyContent: 'center',
              }}
            >
              <TbSun size={20} />
            </Box>
            <Box sx={{ fontWeight: 400 }}>
              {taskContentOpen.isMyday ? 'Task was added in Myday' : 'Add to Myday'}
            </Box>
          </Button>
        </Box>
      </Box>
      <FooterAction taskContentActive={taskContentOpen} />
    </Box>
  );
}

export default StepContent;

const ListStep = styled(Box)({
  backgroundColor: '#fff',
});
