import { useSelector, useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import InputAddTask from '../InputAddTask';
import {
  addNewStepContentToList,
  deleteStepContentInList,
  updateStepContentInList,
} from '../../redux/stepContentList';
import StepItem from './StepItem';
import { updateTaskContentInList } from '../../redux/taskContentList';
import { useMemo, useRef, useState } from 'react';
import ConfirmDelete from './ConfirmDelete';
import FooterAction from './FooterAction';

function StepContent() {
  const dispatch = useDispatch();
  const { stepContentList } = useSelector((state) => state.stepContent);
  const { taskContentOpenId, taskContentList } = useSelector((state) => state.taskContent);
  const [openFormDelete, setOpenFormDelete] = useState(false);
  const stepContentDelete = useRef(null);

  const taskContentActive = useMemo(() => {
    return taskContentList.find((item) => item.id === taskContentOpenId);
  }, [taskContentList, taskContentOpenId]);

  const listStep = useMemo(() => {
    return stepContentList.filter((item) => item.taskContentId === taskContentActive?.id);
  }, [stepContentList, taskContentActive]);

  const handleChangeStatusTaskContent = (e) => {
    dispatch(updateTaskContentInList({ ...taskContentActive, isComplete: e.target.checked }));
  };

  const handleChangeNameTaskContent = (newName) => {
    dispatch(updateTaskContentInList({ ...taskContentActive, taskContentName: newName }));
  };

  const handleAddNewStep = (e) => {
    dispatch(addNewStepContentToList(taskContentActive.id, e.target.value));
  };

  const handleChangeStatusStepContent = (e, stepContent) => {
    dispatch(updateStepContentInList({ ...stepContent, isComplete: e.target.checked }));
  };

  const handleChangeNameStepContent = (newName, stepContent) => {
    dispatch(updateStepContentInList({ ...stepContent, stepContentName: newName }));
  };

  const handleDeleteStepContent = () => {
    dispatch(deleteStepContentInList(stepContentDelete.current.id));
    onClose();
  };

  const onClose = () => {
    stepContentDelete.current = null;
    setOpenFormDelete(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          margin: '16px 24px 0 24px',
          backgroundColor: '#fff',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <StepItem
          checkedStatus={taskContentActive?.isComplete}
          title={taskContentActive?.taskContentName}
          handleUpdate={handleChangeNameTaskContent}
          handleChangeCheckBox={handleChangeStatusTaskContent}
          actionName="Add important"
          icon={<StarBorderIcon sx={{ fontSize: 20, color: '#2564CF' }} />}
          sx={{ fontWeight: 600, fontSize: 16 }}
        />
      </Box>
      <Box
        sx={{
          // mt: '16px',
          overflowX: 'hidden',
          overflowY: 'scroll',
          position: 'relative',
          flex: 1,
        }}
      >
        <Box sx={{ padding: '0px 16px 0px 24px' }}>
          <ListStep>
            {listStep.map((item, index) => (
              <StepItem
                key={index}
                checkedStatus={item.isComplete}
                title={item.stepContentName}
                handleUpdate={(newName) => handleChangeNameStepContent(newName, item)}
                handleChangeCheckBox={(e) => handleChangeStatusStepContent(e, item)}
                actionName="Delete step"
                handleAction={() => {
                  stepContentDelete.current = item;
                  setOpenFormDelete(true);
                }}
                icon={<ClearIcon sx={{ fontSize: 18, fontWeight: 100 }} />}
              />
            ))}
          </ListStep>
          <InputAddTask
            action={handleAddNewStep}
            placeholder="Next step"
            sx={{
              background: '#fff',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          {openFormDelete && (
            <ConfirmDelete
              title={stepContentDelete.current.stepContentName}
              open={openFormDelete}
              onClose={onClose}
              handleDelete={handleDeleteStepContent}
            />
          )}
        </Box>
      </Box>
      <FooterAction taskContentActive={taskContentActive} />
    </Box>
  );
}

export default StepContent;

const ListStep = styled(Box)({
  backgroundColor: '#fff',
});
