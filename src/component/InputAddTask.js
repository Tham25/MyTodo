import { useState } from 'react';
import { Box, Input, InputAdornment, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function InputAddTask({ action, placeholder, isTask, sx }) {
  const [valueInput, setValueInput] = useState('');

  const handleChangeText = (e) => {
    setValueInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      action(e);
      setValueInput('');
      e.preventDefault();
      e.target.blur();
    }
  };

  const backgroundColor = isTask ? '#fff' : 'transparent';

  return (
    <Stack
      sx={{
        boxShadow: isTask && '1px 2px 3px #d7d7d7, -1px 0px 1px #EEEDEC',
        borderRadius: isTask && '3px',
      }}
    >
      <Box sx={{ display: 'flex', backgroundColor, alignItems: 'center', p: '8px 16px', ...sx }}>
        <Box
          sx={{
            display: 'flex',
            width: '32px',
            justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <AddIcon sx={{ fontSize: 20, color: '#2564CF' }} />
        </Box>
        <Input
          disableUnderline
          placeholder={placeholder}
          value={valueInput}
          onChange={handleChangeText}
          onKeyDown={handleSubmit}
          sx={{
            padding: '0 16px',
            '& .MuiInputBase-input.MuiInput-input:focus::placeholder': {
              color: '#727272',
            },
            '& .MuiInputBase-input.MuiInput-input::placeholder': {
              color: '#2564CF',
              opacity: 1,
              fontSize: 14,
            },
            // flex: 1,
            // textDecoration: !onChangText && checkedStatus ? 'line-through' : 'none',
            // ...sx,
          }}
        />
      </Box>
      {isTask && (
        <Box
          sx={{ color: '#FAF9F8', width: '100%', height: '46px', borderTop: '1px solid #ccc' }}
        ></Box>
      )}
    </Stack>
  );
}

export default InputAddTask;
