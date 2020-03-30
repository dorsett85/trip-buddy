import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';

const TransitionModal = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default TransitionModal;
