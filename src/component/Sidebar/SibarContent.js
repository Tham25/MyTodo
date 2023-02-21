import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Divider, ListItem, ListItemButton, ListItemIcon, Stack } from '@mui/material';

import { addNewTaskToList } from '../../redux/taskList';
import { sidebarContent } from '../../config/sidebar';
import ListTaskUserCreate from '../ListTaskUserCreate';
import InputAddTask from '../InputAddTask';

function SidebarContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const action = (e) => {
    dispatch(addNewTaskToList(e.target.value));
  };

  return (
    <Stack sx={{ p: 1 }}>
      {sidebarContent.map((item, index) => {
        const active = item.navigatePath === pathname.slice(1);
        return (
          <ListItem
            key={`${item.name}-${index}`}
            className={`${item.name}`}
            disablePadding
            sx={{ backgroundColor: active ? '#EFF6FC' : '' }}
          >
            <ListItemButton onClick={() => navigate(item.navigatePath, { replace: true })}>
              <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <Box component="span" sx={{ fontSize: 14, fontWeight: active ? 500 : 400 }}>
                {item.name}
              </Box>
            </ListItemButton>
          </ListItem>
        );
      })}
      <Divider />
      <ListTaskUserCreate />

      <InputAddTask action={action} placeholder="Create new list" sx={{ padding: '8px 12px' }} />
    </Stack>
  );
}

export default SidebarContent;
