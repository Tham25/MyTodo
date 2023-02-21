import { Box, Drawer, Slide } from '@mui/material';

import useResponsive from '../../utils/useResponsive';
import SidebarContent from './SibarContent';

function Sidebar({ isOpenSidebar, onCloseSidebar }) {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  const DRAWER_WIDTH = isMobile ? 200 : 250;

  if (!isDesktop) {
    return (
      <>
        <Drawer
          anchor="left"
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          transitionDuration={500}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          <SidebarContent />
        </Drawer>
      </>
    );
  }

  return (
    <Slide direction="right" timeout={300} in={isOpenSidebar}>
      <Box
        display={isOpenSidebar ? 'block' : 'none'}
        className="sidebar-content"
        sx={{
          width: DRAWER_WIDTH,
          height: '100%',
        }}
      >
        <SidebarContent />
      </Box>
    </Slide>
  );
}

export default Sidebar;
