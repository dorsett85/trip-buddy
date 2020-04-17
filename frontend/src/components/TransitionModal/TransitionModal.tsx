import React from 'react';
import Slide, { SlideProps } from '@material-ui/core/Slide';

const TransitionModal = React.forwardRef<unknown, SlideProps>((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default TransitionModal;
