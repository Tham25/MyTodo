import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Collapse, Divider, Stack, Typography } from '@mui/material';

import { addNewTaskContentToList, getTaskContentList } from '../../redux/slices/taskContentList';
import InputAddTask from '../InputAddTask';
import TaskContentItem from './TaskContentItem';

function TaskContentList({ taskName, note }) {
  const dispatch = useDispatch();
  const taskContentList = useSelector((state) => state.taskContent.taskContentList);
  const [openListDone, setOpentListDone] = useState(false);

  const todoList = useMemo(() => {
    if (taskName === 'Important') {
      return taskContentList.filter((item) => item.isImportant === true) || [];
    }

    if (taskName === 'My day') {
      return taskContentList.filter((item) => item.isMyday === true) || [];
    }

    return taskContentList.filter((item) => item.taskListName === taskName) || [];
  }, [taskContentList, taskName]);

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
  }, [dispatch]);

  const handleCreateNewTaskContent = (e) => {
    let pathBonus = '';
    if (!!note) {
      pathBonus = `${taskName}/`;
    }
    dispatch(addNewTaskContentToList(taskName, e.target.value, pathBonus));
  };

  return (
    <Box
      className="task-content-list"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '24px',
        flex: 1,
        overflowY: 'hidden',
      }}
    >
      <Box sx={{ margin: '0 24px' }}>
        <InputAddTask action={handleCreateNewTaskContent} placeholder="Create a new task" isTask />
      </Box>
      <Box
        sx={{
          padding: '0 16px 0 24px',
          flex: 1,
          overflowY: 'scroll',
        }}
      >
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
            <Collapse in={openListDone} timeout="auto">
              {todoListDone.map((item, index) => (
                <TaskContentItem key={index} taskContentItem={item} />
              ))}
            </Collapse>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default TaskContentList;
