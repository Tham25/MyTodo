import { Box, Drawer, Slide } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { closeStepContent } from '../../redux/stepContentList';

import useResponsive from '../../utils/useResponsive';
import ResizeableCard from './ResizeableCard';

function TaskSteps() {
  const isDesktop = useResponsive('up', 'md');
  const { isOpen } = useSelector((state) => state.stepContent);
  const dispatch = useDispatch();

  const onCloseTaskSteps = () => {
    dispatch(closeStepContent());
  };

  if (!isDesktop) {
    return (
      <>
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={onCloseTaskSteps}
          transitionDuration={500}
          PaperProps={
            {
              // sx: { width: DRAWER_WIDTH },
            }
          }
        >
          <ResizeableCard />
        </Drawer>
      </>
    );
  }

  return (
    <Slide direction="left" timeout={300} in={isOpen}>
      <Box
        display={isOpen ? 'block' : 'none'}
        className="TaskSteps-content"
        sx={{
          height: '100%',
        }}
      >
        <ResizeableCard />
      </Box>
    </Slide>
  );
}

export default TaskSteps;
