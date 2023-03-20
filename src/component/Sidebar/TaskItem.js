import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popover,
  Menu,
  List,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { closeStepContent } from '../../redux/slices/stepContentList';
import { useSelector } from 'react-redux';
import { addNewTaskToList, deleteTaskInList } from '../../redux/slices/taskList';
import { sidebarContent } from '../../config/sidebar';

function TaskItem({ item, isCreateByUser }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const position = useRef({ left: 0, top: 0 });
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(closeStepContent());
  };

  // for task create by user
  const handleContextMenu = (event) => {
    if (isCreateByUser) {
      event.preventDefault();
      position.current = { left: event.clientX, top: event.clientY };
      navigate(item.navigatePath, { replace: true });
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <ListItem
      ref={anchorEl}
      className={`${item.name}`}
      disablePadding
      onContextMenu={handleContextMenu}
      sx={{
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <NavLink
        to={item.navigatePath}
        style={({ isActive }) => ({
          width: '100%',
          padding: '12px 20px',
          backgroundColor: isActive ? '#EFF6FC' : 'transparent',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          fontWeight: isActive ? 800 : 400,
          color: '#000',
          justifyContent: 'space-between',
        })}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '32px',
            mr: '16px',
            justifyContent: 'center',
          }}
        >
          {isCreateByUser ? <FormatListBulletedIcon sx={{ fontSize: 20 }} /> : item.icon}
        </ListItemIcon>
        <Box sx={{ flex: 1 }}>{item.name}</Box>
        <Box>2</Box>
      </NavLink>

      <PopoverAction
        anchorEl={anchorEl}
        item={item}
        position={position}
        open={Boolean(anchorEl)}
        handleClose={() => setAnchorEl(null)}
      />
    </ListItem>
  );
}

export default TaskItem;

const PopoverAction = ({ anchorEl, item, position, open, handleClose }) => {
  const { taskList } = useSelector((state) => state.taskList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDuplicateTask = () => {
    dispatch(addNewTaskToList(item.name));
    handleClose();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTaskInList(item));
    handleClose();

    // check index
    const index = taskList.findIndex((task) => task === item);
    const lastTask = taskList[index - 1] || sidebarContent.at(-1);
    navigate(lastTask.navigatePath, { replace: true });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorPosition={{
        left: position.current.left,
        top: position.current.top,
      }}
      anchorReference="anchorPosition"
      sx={{
        visibility: 'hidden',
        backgroundColor: '#ff00002b',
        '& .MuiPaper-elevation': {
          visibility: 'visible',
        },
        // '& .MuiBackdrop-root .MuiBackdrop-invisible': {
        //   visibility: 'visible',
        // },
      }}

      // props
    >
      <List>
        <ListItem disablePadding sx={{ fontWeight: '400', fontSize: 14 }}>
          <ListItemButton onClick={handleDuplicateTask}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ContentCopyIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <Box>Duplicate task</Box>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ color: 'red', fontWeight: '400', fontSize: 14 }}>
          <ListItemButton onClick={handleDeleteTask}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DeleteForeverIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <Box>Delete task</Box>
          </ListItemButton>
        </ListItem>
      </List>
    </Menu>
  );
};
