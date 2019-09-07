import * as colors from '@material-ui/core/colors';

/**
 * Shortcut function for accessing colors in the Material UI color module
 *
 * To access material ui colors, string must be in the form <color>.<hue>
 * where <color> is a key of the material ui colors module and <hue> is
 * a key on that specific color.  E.g., "purple.500" would access
 * the purple property and <hue> would be a property on that color.
 * @param  {string} colorString - <color>.<hue>
 * @return {string}
 * @example
 * // return "#2196f3"
 * getColor('blue.500')
 */
export function getMuiColor(colorString: string) {
  const colorArr = colorString.split('.');
  const [color, hue] = colorArr;
  let muiColor;
  try {
    muiColor = (colors as any)[color][hue];
  } catch {
    return '';
  }
  return muiColor;
}
