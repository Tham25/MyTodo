import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IconButton, Stack } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';

import Sidebar from '../component/Sidebar';
import { MyDay, Important, TaskUserAdd } from '../component/tasks';

function Homepage() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  return (
    <Stack direction="row" sx={{ height: '100vh' }}>
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

      <Stack className="task" sx={{ flex: 1, backgroundColor: '#FAF9F8', p: '16px 24px' }}>
        <Stack className="task-content">
          <Routes>
            <Route path="/" element={<Navigate to="myday" />} />
            <Route path="myday" element={<MyDay />} />
            <Route path="important" element={<Important />} />
            <Route path="task/*" element={<TaskUserAdd />} />
          </Routes>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Homepage;
