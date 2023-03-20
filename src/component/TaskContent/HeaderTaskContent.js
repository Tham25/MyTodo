import { Stack, Typography } from '@mui/material';
import { fDate } from '../../utils/formatTime';

function HeaderTaskContent({ title, sx }) {
  return (
    <Stack sx={{ pb: '16px', ...sx }}>
      <Stack
        sx={{
          height: 48,
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 500,
          color: '#2564CF',
        }}
      >
        {title}
      </Stack>
      {title === 'My day' && (
        <Typography sx={{ fontSize: 12, color: '#605e5c' }}>{fDate(new Date())}</Typography>
      )}
    </Stack>
  );
}

export default HeaderTaskContent;
