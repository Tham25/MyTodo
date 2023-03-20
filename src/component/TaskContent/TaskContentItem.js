import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popover,
  Tooltip,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TbStarOff } from 'react-icons/tb';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TbSun, TbSunOff } from 'react-icons/tb';

import CheckBoxCustom from '../CheckBoxCustom';
import { openStepContent } from '../../redux/slices/stepContentList';
import {
  deleteTaskContentInList,
  setTaskContentOpen,
  updateTaskContentInList,
} from '../../redux/slices/taskContentList';
import ConfirmDelete from '../TaskSteps/ConfirmDelete';

export default memo(TaskContentItem);

function TaskContentItem({ taskContentItem, isTitle, sxIcon }) {
  const dispatch = useDispatch();
  const position = useRef({ left: 0, top: 0 });
  const [anchorEl, setAnchorEl] = useState(null);
  const taskContentOpen = useSelector((state) => state.taskContent.taskContentOpen);
  const [valueInput, setValueInput] = useState(taskContentItem.taskContentName);
  const [onChangText, setOnChangText] = useState(false);
  const navigate = useNavigate();
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const isActive = taskContentOpen.id === taskContentItem.id;

  const handleCheckBox = (e) => {
    e.stopPropagation();
    dispatch(updateTaskContentInList({ ...taskContentItem, isComplete: e.target.checked }));
  };

  const handleOpenStepList = () => {
    dispatch(openStepContent());
    dispatch(setTaskContentOpen(taskContentItem));
    navigate(taskContentItem.pathName, { replace: true });
  };

  const handleContextMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(null);
    }
    event.preventDefault();
    position.current = { left: event.clientX, top: event.clientY };
    setAnchorEl(event.currentTarget);
    navigate(taskContentItem.pathName, { replace: true });
    dispatch(setTaskContentOpen(taskContentItem));
  };

  // for text input

  useEffect(() => {
    setValueInput(taskContentItem.taskContentName);
  }, [taskContentItem]);

  const handleOnchangeText = (e) => {
    if (!onChangText) {
      setOnChangText(true);
    }

    setValueInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      dispatch(updateTaskContentInList({ ...taskContentItem, taskContentName: e.target.value }));
      dispatch(setTaskContentOpen({ ...taskContentItem, taskContentName: e.target.value }));
    }
  };

  const handleAction = (type) => {
    switch (type) {
      case 'myday':
        dispatch(
          updateTaskContentInList({ ...taskContentItem, isMyday: !taskContentItem.isMyday }),
        );
        dispatch(setTaskContentOpen({ ...taskContentItem, isMyday: !taskContentItem.isMyday }));
        setAnchorEl(null);
        break;
      case 'important':
        dispatch(
          updateTaskContentInList({
            ...taskContentItem,
            isImportant: !taskContentItem.isImportant,
          }),
        );
        dispatch(
          setTaskContentOpen({
            ...taskContentItem,
            isImportant: !taskContentItem.isImportant,
          }),
        );
        setAnchorEl(null);
        break;
      case 'delete':
        setOpenFormDelete(true);
        setAnchorEl(null);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '52px',
          alignItems: 'center',
          p: '0 16px',
          mt: isTitle ? 0 : '8px',
          backgroundColor: !isTitle && isActive ? '#EFF6FC' : '#fff',
          '&:hover': {
            backgroundColor: !isTitle && isActive ? '#EFF6FC' : '#F5F5F5',
          },
          boxShadow: isTitle
            ? 'none'
            : '0px 0.3px 0.9px rgba(0,0,0,0.1),0px 1.6px 3.6px rgba(0,0,0,0.1)',
          borderRadius: isTitle ? '5px 5px 0 0' : 'none',
        }}
      >
        <CheckBoxCustom checkedStatus={taskContentItem?.isComplete} handleChange={handleCheckBox} />
        {isTitle ? (
          <Input
            disableUnderline
            sx={{
              height: '100%',
              padding: '8px 16px',
              flex: 1,
              textDecoration: !onChangText && taskContentItem.isComplete ? 'line-through' : 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
            value={valueInput}
            onChange={handleOnchangeText}
            onKeyDown={handleSubmit}
          />
        ) : (
          <Button
            onContextMenu={handleContextMenu}
            disableRipple
            sx={{
              height: '100%',
              flex: 1,
              padding: '8px 16px',
              color: '#000',
              textTransform: 'none',
              justifyContent: 'start',
              fontWeight: 400,
              fontSize: 14,
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: taskContentItem.isComplete ? 'line-through' : 'none',
              },
              textDecoration: taskContentItem.isComplete ? 'line-through' : 'none',
            }}
            onClick={handleOpenStepList}
          >
            {taskContentItem.taskContentName}
          </Button>
        )}
        <Tooltip
          title={
            taskContentItem.isImportant ? 'Remove priority important' : 'Add priority important'
          }
          arrow
          placement="top"
        >
          <IconButton sx={sxIcon} onClick={() => handleAction('important')}>
            {taskContentItem.isImportant ? (
              <AiFillStar size={20} color="#2564CF" />
            ) : (
              <AiOutlineStar size={20} color="#2564CF" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <PopoverAction
        anchorEl={anchorEl}
        position={position.current}
        item={taskContentItem}
        open={Boolean(anchorEl)}
        handleClose={() => setAnchorEl(null)}
        handleAction={handleAction}
      />
      {openFormDelete && (
        <ConfirmDelete
          title={taskContentItem.name}
          open={openFormDelete}
          onClose={() => setOpenFormDelete(false)}
          handleDelete={() => {
            dispatch(deleteTaskContentInList(taskContentItem.id));
            setOpenFormDelete(false);
          }}
        />
      )}
    </>
  );
}

const PopoverAction = ({ anchorEl, position, item, open, handleClose, handleAction }) => {
  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorPosition={{
        left: position.left,
        top: position.top,
      }}
      anchorReference="anchorPosition"
      PaperProps={{
        sx: {
          padding: '6px 0',
        },
      }}
    >
      <List>
        <ListItem disablePadding sx={{ fontWeight: '400', fontSize: 14 }}>
          <ListItemButton onClick={() => handleAction('myday')}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.isMyday ? <TbSunOff size={20} /> : <TbSun size={20} />}
            </ListItemIcon>
            <Box>{item.isMyday ? 'Remove from My day' : 'Add to My day'}</Box>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ fontWeight: '400', fontSize: 14 }}>
          <ListItemButton onClick={() => handleAction('important')}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.isImportant ? <TbStarOff size={20} /> : <AiOutlineStar size={20} />}
            </ListItemIcon>
            <Box>{item.isImportant ? 'Remove priority important' : 'Add priority important'}</Box>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ color: 'red', fontWeight: '400', fontSize: 14 }}>
          <ListItemButton onClick={() => handleAction('delete')}>
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
