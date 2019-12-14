import { DefaultTheme } from 'styled-components';

// Theme sizes to be used as values and types
export const themeSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type ThemeSizes = typeof themeSizes[number];
export type SizedType<T = number> = {
  [key in ThemeSizes]: T;
};
export type ThemeSizeArg = ThemeSizes | number;

// Breakpoint media query
const mediaQuery = (condition: string) => `@media only screen and (${condition})`;

export class ThemeStyles implements DefaultTheme {
  readonly breakpoints = {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    },
    up: (min: ThemeSizeArg) => {
      const minWidth = typeof min === 'number' ? min : this.breakpoints.values[min];
      return mediaQuery(`min-width: ${minWidth}px`);
    },
    down: (max: ThemeSizeArg) => {
      const maxWidth = typeof max === 'number' ? max : this.breakpoints.values[max];
      return mediaQuery(`max-width: ${maxWidth}px`);
    },
    between: (min: ThemeSizeArg, max: ThemeSizeArg) => {
      const minWidth = typeof min === 'number' ? min : this.breakpoints.values[min];
      const maxWidth = typeof max === 'number' ? max : this.breakpoints.values[max];
      return mediaQuery(`min-width: ${minWidth}px and max-width: ${maxWidth}px`);
    }
  };

  readonly colors = {
    primary: 'red',
    secondary: 'blue',
    white: '#ffffff',
    black: '#000000'
  };

  readonly borderRadius = '6px';
}

export const theme = new ThemeStyles();
