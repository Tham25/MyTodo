import { Box, IconButton, Input, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';

import {
  deleteStepContentInList,
  updateStepContentInList,
} from '../../redux/slices/stepContentList';
import CheckBoxCustom from '../CheckBoxCustom';
import ConfirmDelete from './ConfirmDelete';

function StepItem({ stepItem }) {
  const [valueInput, setValueInput] = useState('');
  const [onChangText, setOnChangText] = useState(false);
  const dispatch = useDispatch();
  const [checkedStatus, setCheckedStatus] = useState(stepItem.isComplete);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  useEffect(() => {
    setValueInput(stepItem.stepContentName);
  }, [stepItem.stepContentName]);

  const handleChangeValue = (e) => {
    setValueInput(e.target.value);
    if (!onChangText) {
      setOnChangText(true);
    }
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      // change name
      dispatch(updateStepContentInList({ ...stepItem, stepContentName: e.target.value }));
      e.preventDefault();
      e.target.blur();

      if (onChangText) {
        setOnChangText(false);
      }
    }
  };

  const handleChangeCheckBox = (e) => {
    setCheckedStatus(e.target.checked);
    dispatch(updateStepContentInList({ ...stepItem, isComplete: e.target.checked }));
  };

  const handleDeleteStep = () => {
    dispatch(deleteStepContentInList(stepItem.id));
    setOpenFormDelete(false);
  };

  return (
    <>
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
          }}
          value={valueInput}
          onChange={handleChangeValue}
          onKeyDown={handleSubmit}
        />
        <Tooltip title="Delete step" arrow placement="top">
          <IconButton sx={{ p: 0 }} onClick={() => setOpenFormDelete(true)}>
            <ClearIcon sx={{ fontSize: 18, fontWeight: 100 }} />
          </IconButton>
        </Tooltip>
      </WrapperBox>
      {openFormDelete && (
        <ConfirmDelete
          title={stepItem.stepContentName}
          open={openFormDelete}
          onClose={() => setOpenFormDelete(false)}
          handleDelete={handleDeleteStep}
        />
      )}
    </>
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
