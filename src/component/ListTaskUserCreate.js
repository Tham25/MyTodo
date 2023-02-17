import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, Popover } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTaskToList, deleteTaskInList, getTaskList } from '../redux/taskList';
import { sidebarContent } from '../config/sidebar';

function ListTaskUserCreate() {
  const { taskList } = useSelector((state) => state.taskList);
  const dispatch = useDispatch();

  // first load
  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);
  return (
    <List>
      {taskList.map((item, index) => {
        return <ItemCustom key={`${item.name}-${index}`} item={item} />;
      })}
    </List>
  );
}

export default ListTaskUserCreate;

const ItemCustom = ({ item }) => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [itemContextMenu, setItemContextMenu] = useState({ name: '' });
  const { pathname } = useLocation();

  const active = useMemo(() => {
    return pathname.slice(1) === item.navigatePath;
  }, [item.navigatePath, pathname]);

  const handleClick = (path) => {
    navigate(path, { replace: true });
  };

  const handleClose = () => {
    setItemContextMenu({ name: '' });
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setItemContextMenu(item);
    navigate(item.navigatePath, { replace: true });
  };

  return (
    <ListItem
      className={`${item.name}`}
      ref={anchorRef}
      disablePadding
      sx={{ backgroundColor: active ? '#EFF6FC' : '' }}
    >
      <ListItemButton
        sx={{ position: 'relative' }}
        onContextMenu={(event) => handleContextMenu(event, item)}
        onClick={() => handleClick(item.navigatePath)}
      >
        <ListItemIcon sx={{ minWidth: '40px' }}>
          <FormatListBulletedIcon sx={{ fontSize: 20 }} />
        </ListItemIcon>
        <Box component="span" sx={{ fontSize: 14, fontWeight: active ? 500 : 400 }}>
          {item.name}
        </Box>
      </ListItemButton>
      <PopoverAction
        anchorRef={anchorRef}
        item={item}
        open={itemContextMenu.name === item.name}
        handleClose={handleClose}
      />
    </ListItem>
  );
};

const PopoverAction = ({ anchorRef, item, open, handleClose }) => {
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
    <Popover
      anchorEl={anchorRef.current}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          mt: '20px',
          ml: '-24px',
        },
      }}
    >
      <List sx={{}}>
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
    </Popover>
  );
};
