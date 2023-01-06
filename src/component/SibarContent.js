import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Input,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { addNewTaskToList, getTaskList } from '../redux/taskList';
import { sidebarContent } from '../config/sidebar';
import ListTaskUserCreate from './ListTaskUserCreate';

function SidebarContent() {
  const [valueInput, setValueInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { taskList } = useSelector((state) => state.taskList);

  // first load
  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      dispatch(addNewTaskToList(e.target.value));
      setValueInput('');
      e.preventDefault();
      e.target.blur();

      console.log('taskList', taskList);
    }
  };

  const handleChangeText = (text) => {
    setValueInput(text);
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

      <Input
        onKeyDown={handleSubmit}
        sx={{
          p: '8px 16px',
          '& .MuiInputBase-input.MuiInput-input:focus::placeholder': {
            color: '#727272',
          },
          '& .MuiInputBase-input.MuiInput-input::placeholder': {
            color: '#2564CF',
            opacity: 1,
            fontSize: 14,
          },
        }}
        autoComplete="off"
        value={valueInput}
        onChange={(e) => handleChangeText(e.target.value)}
        disableUnderline
        placeholder="Create new list"
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment sx={{ mr: '16px' }} position="start">
            <AddIcon sx={{ color: '#2564CF', fontSize: 20 }} />
          </InputAdornment>
        }
      />
    </Stack>
  );
}

export default SidebarContent;
