import { Box, IconButton, Input, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CheckBoxCustom from '../CheckBoxCustom';

function StepItem({
  checkedStatus = false,
  title = '',
  handleUpdate,
  handleChangeCheckBox,
  actionName,
  handleAction,
  icon,
  sx,
}) {
  const [valueInput, setValueInput] = useState('');
  const [onChangText, setOnChangText] = useState(false);

  useEffect(() => {
    setValueInput(title);
  }, [title]);

  const handleChangeValue = (e) => {
    setValueInput(e.target.value);
    if (!onChangText) {
      setOnChangText(true);
    }
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      handleUpdate(e.target.value);
      e.preventDefault();
      e.target.blur();

      if (onChangText) {
        setOnChangText(false);
      }
    }
  };

  return (
    <WrapperBox>
      <CheckBoxCustom checkedStatus={checkedStatus} handleChange={handleChangeCheckBox} />
      <Input
        disableUnderline
        sx={{
          padding: '0 16px',
          flex: 1,
          textDecoration: !onChangText && checkedStatus ? 'line-through' : 'none',
          fontSize: 14,
          fontWeight: 300,
          ...sx,
        }}
        value={valueInput}
        onChange={handleChangeValue}
        onKeyDown={handleSubmit}
      />
      <Tooltip title={actionName} arrow placement="top">
        <IconButton sx={{ p: 0 }} onClick={handleAction}>
          {icon}
        </IconButton>
      </Tooltip>
    </WrapperBox>
  );
}

export default StepItem;

const WrapperBox = styled(Box)({
  padding: '16px 16px',
  height: 20,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  '&:hover': { backgroundColor: '#f3f2f1' },
  boxShadow: '25px 26px 0 -25px #edebe9',
});
