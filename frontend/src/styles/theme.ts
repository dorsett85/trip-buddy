import { DefaultTheme } from 'styled-components';

export class ThemeStyles implements DefaultTheme {
  readonly colors = {
    primary: 'red',
    secondary: 'blue',
    white: '#ffffff',
    black: '#000000'
  };

  readonly borderRadius = '6px';
}

export const theme = new ThemeStyles();
