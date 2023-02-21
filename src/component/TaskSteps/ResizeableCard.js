import { useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import useResponsive from '../../utils/useResponsive';
import StepContent from './StepContent';

function ResizeableCard() {
  const [width, setWidth] = useState(360);
  const nodeRef = useRef(null);
  const isMobile = useResponsive('down', 'sm');
  const isTablet = useResponsive('down', 'md');

  const handleStop = (event) => {
    const newWitdth = vw(-event.clientX);
    setWidth(newWitdth);
  };

  const maxWidth = useMemo(() => {
    if (isMobile) return 360;
    if (isTablet) return 500;
    return 700;
  }, [isMobile, isTablet]);

  return (
    <ContainerBox>
      <Draggable nodeRef={nodeRef} bounds={{ left: 0, right: 0 }} axis="x" onStop={handleStop}>
        <DragBox ref={nodeRef} />
      </Draggable>
      <ContentBox width={width} maxWidth={maxWidth}>
        <StepContent />
      </ContentBox>
    </ContainerBox>
  );
}

export default ResizeableCard;

const vw = (sizeChange) => {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return w + sizeChange;
};

const DragBox = styled(Box)({
  backgroundColor: '#FAF9F8',
  width: 4,
  cursor: 'col-resize',
  position: 'relative',
  height: '100%',
});

const ContainerBox = styled(Box)({
  display: 'flex',
  height: '100%',
  boxShadow: '0px 1.2px 3.6px #ccc,0px 6.4px 14.4px #ccc',
  // position: 'relative',
});

const ContentBox = styled(Box)({
  transition: 'width 180ms ease',
  backgroundColor: '#FAF9F8',
  minWidth: 360,
  width: (props) => props.width,
  maxWidth: (props) => props.maxWidth,
  height: '100%',
  // justifyContent: 'center',
  // position:
});
