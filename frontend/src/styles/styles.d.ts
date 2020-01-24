// import original module declarations
import 'styled-components';
import { SizedType, ThemeSizeArg } from './theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    readonly breakpoints: {
      values: SizedType;
      up: (min: ThemeSizeArg) => string;
      down: (max: ThemeSizeArg) => string;
      between: (min: ThemeSizeArg, max: ThemeSizeArg) => string;
    };

    readonly colors: {
      primary: '#2196f3';
      secondary: '#f44336';
      green: '#4caf50';
      red: '#f44336';
      white: '#ffffff';
      black: '#000000';
    };

    spacing: (size: ThemeSizeArg = 'md') => string;

    borderRadius: string;
  }
}
