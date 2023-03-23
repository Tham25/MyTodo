import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Stack } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';

import Sidebar from '../component/Sidebar';
import { MyDay, Important, TaskUserAdd, TaskDefault } from '../component/tasks';
import TaskSteps from '../component/TaskSteps';
import useResponsive from '../utils/useResponsive';

function Homepage() {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const isOpen = useSelector((state) => state.stepContent.isOpen);

  useEffect(() => {
    if (!isDesktop && isOpenSidebar && isOpen) {
      setIsOpenSidebar(false);
    }
  }, [dispatch, isDesktop, isOpenSidebar, isOpen]);

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
      <Stack id="task-content" sx={{ backgroundColor: '#FAF9F8', p: 0, flex: 1 }}>
        <Routes>
          <Route path="/MyTodo/" element={<Navigate to="myday" />} />
          <Route path="/MyTodo/myday/*" element={<MyDay />} />
          <Route path="/MyTodo/important/*" element={<Important />} />
          <Route path="/MyTodo/taskDefault/*" element={<TaskDefault />} />
          <Route path="/MyTodo/task/*" element={<TaskUserAdd />} />
        </Routes>
      </Stack>
      <TaskSteps />
    </Stack>
  );
}

export default Homepage;
