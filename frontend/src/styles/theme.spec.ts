import { theme } from './theme';

describe('theme object', () => {
  it('should generate min-width media query', () => {
    let mediaQuery = theme.breakpoints.up('xs');
    expect(mediaQuery).toBe('@media only screen and (min-width: 0px)');

    mediaQuery = theme.breakpoints.up(500);
    expect(mediaQuery).toBe('@media only screen and (min-width: 500px)');
  });

  it('should generate max-width media query', () => {
    let mediaQuery = theme.breakpoints.down('xl');
    expect(mediaQuery).toBe('@media only screen and (max-width: 1200px)');

    mediaQuery = theme.breakpoints.down(500);
    expect(mediaQuery).toBe('@media only screen and (max-width: 500px)');
  });

  it('should generate between media query', () => {
    let mediaQuery = theme.breakpoints.between('sm', 'md');
    expect(mediaQuery).toBe(
      '@media only screen and (min-width: 576px and max-width: 768px)'
    );

    mediaQuery = theme.breakpoints.between(100, 1000);
    expect(mediaQuery).toBe(
      '@media only screen and (min-width: 100px and max-width: 1000px)'
    );
  });
});
