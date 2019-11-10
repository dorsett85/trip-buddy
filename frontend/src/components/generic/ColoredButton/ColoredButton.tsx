import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

interface ColoredButtonProps extends Omit<ButtonProps, 'color'> {
  color: MuiColor;
}

/**
 * Colored button component using material UI
 */
const ColoredButton = ({ color, children, ...rest }: ColoredButtonProps) => {
  const theme = createMuiTheme({
    palette: {
      primary: (colors as any)[color]
    }
  });
  return (
    <MuiThemeProvider theme={theme}>
      <Button {...rest} color='primary'>
        {children}
      </Button>
    </MuiThemeProvider>
  );
};

export default memo(ColoredButton);
