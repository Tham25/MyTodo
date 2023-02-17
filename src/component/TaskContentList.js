// import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewTaskContentToList,
  getTaskContentList,
  updateTaskContentInList,
} from '../redux/taskContentList';
import InputAddTask from './InputAddTask';
import TaskItem from './TaskItem';

function TaskContentList({ taskListName }) {
  const dispatch = useDispatch();
  const { taskContentList } = useSelector((state) => state.taskContent);
  const [openListDone, setOpentListDone] = useState(false);

  const todoList = useMemo(
    () => taskContentList.filter((item) => item.taskListName === taskListName),
    [taskContentList, taskListName],
  );

  const todoListDoing = useMemo(
    () => todoList.filter((item) => item.isComplete === false),
    [todoList],
  );
  const todoListDone = useMemo(
    () => todoList.filter((item) => item.isComplete === true),
    [todoList],
  );

  // console.log('todoListtodoList', todoList);

  // first load
  useEffect(() => {
    dispatch(getTaskContentList());
  }, [dispatch]);

  const action = (e) => {
    dispatch(addNewTaskContentToList(taskListName, e.target.value));
  };

  const handleChangeStateTask = (item, stateTask) => {
    // update trang thai cua task
    dispatch(updateTaskContentInList(item, stateTask));
  };

  return (
    <Box>
      <InputAddTask action={action} placeholder="Create a new task" isTask />
      {todoListDoing.map((item, index) => (
        <TaskItem
          key={index}
          taskContent={item}
          handleStateTask={(stateTask) => handleChangeStateTask(item, stateTask)}
        />
      ))}
      {todoListDone.length !== 0 && (
        <Stack>
          <Button
            disableRipple
            sx={{
              color: '#000',
              height: '52px',
              justifyContent: 'start',
              '&:hover': { backgroundColor: 'transparent' },
              textTransform: 'none',
            }}
            onClick={() => setOpentListDone(!openListDone)}
          >
            {openListDone ? (
              <KeyboardArrowDownIcon sx={{ fontSize: 26, color: '#605E5C' }} />
            ) : (
              <KeyboardArrowRightIcon sx={{ fontSize: 26, color: '#605E5C' }} />
            )}
            <Typography sx={{ ml: 2, fontSize: '14px' }}>Completed</Typography>
            <Typography sx={{ ml: 2, color: '#605E5C', fontSize: '14px' }}>
              {todoListDone.length}
            </Typography>
          </Button>
          {!openListDone && <Divider />}
          <Collapse in={openListDone} timeout="auto" unmountOnExit>
            {todoListDone.map((item, index) => (
              <TaskItem
                key={index}
                taskContent={item}
                handleStateTask={(stateTask) => handleChangeStateTask(item, stateTask)}
              />
            ))}
          </Collapse>
        </Stack>
      )}
    </Box>
  );
}

export default TaskContentList;
