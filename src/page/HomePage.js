import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Stack } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';

import Sidebar from '../component/Sidebar';
import { MyDay, Important, TaskUserAdd } from '../component/tasks';
import TaskSteps from '../component/TaskSteps';
import useResponsive from '../utils/useResponsive';
import { closeStepContent } from '../redux/stepContentList';

function Homepage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'md');
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const { isOpen } = useSelector((state) => state.stepContent);

  useEffect(() => {
    console.log('isDesktop', isDesktop, isOpenSidebar, isOpen);
    if (!isDesktop && isOpenSidebar && isOpen) {
      //
      console.log('set lai sidebar');
      setIsOpenSidebar(false);
    }
  }, [dispatch, isDesktop, isOpenSidebar, isOpen]);

  useEffect(() => {
    if (isOpen) {
      dispatch(closeStepContent());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Stack direction="row" sx={{ height: '100vh', overflow: 'hidden' }}>
      <Stack
        sx={{
          pt: '16px',
          backgroundColor: isOpenSidebar ? '' : '#FAF9F8',
          zIndex: 1,
          boxShadow: isOpenSidebar ? '1px 1px 4px #ccc' : 'none',
        }}
      >
        <IconButton
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
          sx={{ width: '42px', ml: '16px' }}
        >
          <ReorderIcon sx={{ pd: 0 }} />
        </IconButton>
        <Sidebar isOpenSidebar={isOpenSidebar} onCloseSidebar={() => setIsOpenSidebar(false)} />
      </Stack>
      <Stack id="task-content" sx={{ flex: 1, backgroundColor: '#FAF9F8', p: 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to="myday" />} />
          <Route path="myday" element={<MyDay />} />
          <Route path="important" element={<Important />} />
          <Route path="task/*" element={<TaskUserAdd />} />
        </Routes>
      </Stack>
      <TaskSteps />
    </Stack>
  );
}

export default Homepage;
