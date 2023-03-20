import HomeIcon from '@mui/icons-material/Home';
import { AiOutlineStar } from 'react-icons/ai';
import { TbSun } from 'react-icons/tb';

export const sidebarContent = [
  {
    name: 'My day',
    icon: <TbSun size={20} />,
    navigatePath: 'myday',
  },
  {
    name: 'Important',
    icon: <AiOutlineStar size={20} />,
    navigatePath: 'important',
  },
  {
    name: 'Task Default',
    icon: <HomeIcon sx={{ fontSize: 20 }} />,
    navigatePath: 'taskDefault',
  },
];
