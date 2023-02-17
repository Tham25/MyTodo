import { useState } from 'react';
import { Box, Button, Typography, Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { makeStyles } from '@material-ui/core/styles';
import Done from '@mui/icons-material/Done';
// import Checkbox from '@mui/joy/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

function TaskItem({ taskContent, handleStateTask, handleOpenStepList }) {
  const handleChange = (e) => {
    e.stopPropagation();
    handleStateTask(e.target.checked);
  };

  const textDecoration = taskContent.isComplete ? 'line-through' : 'none';
  const [onFocus, setOnFocus ]= useState(false);

  console.log("oonFocusn", onFocus);
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '52px',
        backgroundColor: '#fff',
        boxShadow: '1px 2px 3px #d7d7d7, -1px 0px 1px #EEEDEC',
        borderRadius: '3px',
        mt: '8px',
        justifyContent: 'start',
        textTransform: 'none',
        color: '#000',
        '&:hover': { backgroundColor: '#F5F5F5' },
        cursor: 'pointer',
      }}
    >
      <Box sx={{ p: '0 16px', display: 'flex', width: '100%' }}>
        <Checkbox
          checked={taskContent.isComplete}
          onChange={handleChange}
          icon={onFocus ? <AccessibilityNewIcon /> : <RadioButtonUncheckedIcon sx={{ fontSize: 22, color: '#2564CF' }} /> }
          checkedIcon={<CheckCircleIcon sx={{ fontSize: 22, color: '#2564CF' }} />}
          sx={{
            '&:hover': {
              '& svg': {
                '& path': {
                  d: "path('M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z')"
                }
              }
            }
          }}
        />
        <Button
          disableRipple
          onClick={() => console.log('opne step')}
          sx={{
            p: 0,
            ml: '16px',
            fontSize: '14px',
            textDecoration,
            textTransform: 'none',
            color: '#000',
            '&:hover': { backgroundColor: 'transparent' },
            justifyContent: 'start',
          }}
        >
          {taskContent.taskContentName}
        </Button>
      </Box>
    </Box>
  );
}

export default TaskItem;
