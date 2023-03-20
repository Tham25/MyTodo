import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, IconButton, Tooltip } from '@mui/material';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import { fDate } from '../../utils/formatTime';
import { closeStepContent } from '../../redux/slices/stepContentList';
import { deleteTaskContentInList } from '../../redux/slices/taskContentList';
import ConfirmDelete from './ConfirmDelete';

function FooterAction({ taskContentActive }) {
  const dispatch = useDispatch();
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleClose = () => {
    dispatch(closeStepContent());
  };

  const handleDelete = () => {
    dispatch(deleteTaskContentInList(taskContentActive.id));
    dispatch(closeStepContent());
    setOpenFormDelete(false);
  };

  if (!taskContentActive) {
    return null;
  }

  const time =
    fDate(new Date()) === fDate(taskContentActive.timeCreate)
      ? 'Today'
      : fDate(taskContentActive?.timeCreate);

  return (
    <FooterBox>
      <Tooltip title="Hide detail view">
        <IconButton sx={{ p: 0 }} onClick={handleClose}>
          <InputOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
      <Box sx={{ fontSize: 13, opacity: 0.6 }}>Created on {time}</Box>
      <Tooltip title="Delete task">
        <IconButton onClick={() => setOpenFormDelete(true)} sx={{ p: 0 }}>
          <DeleteIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
      {openFormDelete && (
        <ConfirmDelete
          title={taskContentActive.taskContentName}
          open={openFormDelete}
          onClose={() => {
            setOpenFormDelete(false);
          }}
          handleDelete={handleDelete}
        />
      )}
    </FooterBox>
  );
}

export default FooterAction;

const FooterBox = styled(Box)({
  height: 26,
  // background: 'red',
  padding: '16px 0',
  margin: '0 24px',
  borderTop: '1px solid #ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
