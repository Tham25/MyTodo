import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sidebarContent } from '../config/sidebar';

function HeaderTaskContent() {
  const { pathname } = useLocation();
  const { taskList } = useSelector((state) => state.taskList);

  const title = useMemo(() => {
    const list = [...sidebarContent, ...taskList];
    const task = list.find((task) => task.navigatePath === pathname.slice(1));

    return task?.name || '';
  }, [pathname, taskList]);

  return (
    <Stack
      sx={{
        height: 48,
        // backgroundColor: 'red',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 500,
        color: '#2564CF',
      }}
    >
      {title}
    </Stack>
  );
}

export default HeaderTaskContent;
