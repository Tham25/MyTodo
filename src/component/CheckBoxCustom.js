import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CheckBoxCustom({ checkedStatus = false, handleChange, sx }) {
  return (
    <Checkbox
      checked={checkedStatus}
      onChange={handleChange}
      icon={<RadioButtonUncheckedIcon sx={{ fontSize: 18, color: '#2564CF' }} />}
      checkedIcon={<CheckCircleIcon sx={{ fontSize: 18, color: '#2564CF' }} />}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 32,
        height: 32,
        '&:hover': {
          '& svg': {
            '& path': {
              d: "path('M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z')",
            },
          },
        },
        ...sx,
      }}
    />
  );
}

export default CheckBoxCustom;
