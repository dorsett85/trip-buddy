// import original module declarations
import 'styled-components';
import { SizedType, ThemeSizeArg } from './theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      values: SizedType;
      up: (min: ThemeSizeArg) => string;
      down: (max: ThemeSizeArg) => string;
      between: (min: ThemeSizeArg, max: ThemeSizeArg) => string;
    };

    colors: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
    };

    borderRadius: string;
  }
}
