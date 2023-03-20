import { Box, Drawer, Slide } from '@mui/material';
import { memo } from 'react';

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
            sx: { width: DRAWER_WIDTH, overflow: 'scroll' },
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
          overflow: 'auto',
        }}
      >
        <SidebarContent />
      </Box>
    </Slide>
  );
}

export default memo(Sidebar);
