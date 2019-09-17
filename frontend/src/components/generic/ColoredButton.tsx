import React, { memo, ReactNode } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

interface ColoredButtonProps extends ButtonProps {
  children?: ReactNode;
  clr: MuiColor;
}

/**
 * Colored button component using material UI
 */
const ColoredButton = ({ clr, children, ...rest }: ColoredButtonProps) => {
  const theme = createMuiTheme({
    palette: {
      primary: (colors as any)[clr]
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
