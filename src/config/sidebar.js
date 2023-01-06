import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const sidebarContent = [
  {
    name: 'My day',
    icon: <WbSunnyIcon sx={{ fontSize: 20 }} />,
    navigatePath: 'myday',
  },
  {
    name: 'Important',
    icon: <StarOutlineIcon sx={{ fontSize: 20 }} />,
    navigatePath: 'important',
  },
];
