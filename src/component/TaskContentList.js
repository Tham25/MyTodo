// import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTaskContentToList, getTaskContentList } from '../redux/taskContentList';
import InputAddTask from './InputAddTask';
import TaskContentItem from './TaskContentItem';

function TaskContentList({ taskListName }) {
  const dispatch = useDispatch();
  const { taskContentList } = useSelector((state) => state.taskContent);
  const [openListDone, setOpentListDone] = useState(false);

  console.log('taskContentList', taskContentList);

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

  useEffect(() => {
    dispatch(getTaskContentList());
  }, [dispatch, taskListName]);

  const action = (e) => {
    dispatch(addNewTaskContentToList(taskListName, e.target.value));
  };

  return (
    <Box className="task-content-list">
      <InputAddTask action={action} placeholder="Create a new task" isTask />
      {/* <Box sx={{ overflowY: 'auto', height: '500px' }}> */}
      {todoListDoing.map((item, index) => (
        <TaskContentItem key={index} taskContentItem={item} />
      ))}
      {todoListDone.length !== 0 && (
        <Stack>
          <Button
            disableRipple
            sx={{
              mt: 2,
              color: '#000',
              // height: '36px',
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
              <TaskContentItem key={index} taskContentItem={item} />
            ))}
          </Collapse>
        </Stack>
      )}
      {/* </Box> */}
    </Box>
  );
}

export default TaskContentList;
