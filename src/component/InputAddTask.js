import { useState } from 'react';
import { Box, Input, InputAdornment, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function InputAddTask({ action, placeholder, isTask }) {
  const [valueInput, setValueInput] = useState('');

  const handleChangeText = (text) => {
    setValueInput(text);
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
          backgroundColor,
          width: '100%',
          height: '52px',
        }}
        autoFocus={isTask}
        autoComplete="off"
        value={valueInput}
        onChange={(e) => handleChangeText(e.target.value)}
        disableUnderline
        placeholder={placeholder}
        startAdornment={
          <InputAdornment sx={{ mr: '16px' }} position="start">
            <AddIcon sx={{ color: '#2564CF', fontSize: 20 }} />
          </InputAdornment>
        }
      />
      {isTask && (
        <Box
          sx={{ color: '#FAF9F8', width: '100%', height: '46px', borderTop: '1px solid #ccc' }}
        ></Box>
      )}
    </Stack>
  );
}

export default InputAddTask;
