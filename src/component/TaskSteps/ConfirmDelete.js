import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function ConfirmDelete({ title, open, onClose, handleDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: 16 }}>{`"${title}" will be permanently deleted.`}</DialogTitle>
      <DialogContent>
        <DialogContentText>You can't undo this action</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          sx={{
            backgroundColor: '#DB3A29',
            color: '#fff',
            '&:hover': { backgroundColor: '#DB3A29', opacity: 0.8 },
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDelete;
