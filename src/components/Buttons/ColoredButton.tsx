import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { getColor } from '../../common/js/functions/getColor';

interface ColoredButtonProps extends ButtonProps {
  bgClr: string;
  clr: string;
}

const ColoredButton = (props: ColoredButtonProps) => {
  // eslint-disable-next-line prefer-const
  let { bgClr, clr, children, style, ...rest } = props;
  const background = getColor(bgClr);
  const color = getColor(clr);
  return (
    <Button style={{ background, color, ...style }} {...rest}>
      {children}
    </Button>
  );
};

export default memo(ColoredButton);
