// import original module declarations
import 'styled-components';
import { SizedType } from './theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      values: SizedType
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
