import * as colors from '@material-ui/core/colors';

/**
 * Shortcut function for accessing colors in the Material UI color module
 *
 * To access material ui colors, string must be in the form <color>.<shade>
 * where <color> is a key of the material ui colors module and <shade> is
 * a key on that specific color.  E.g., "purple.500" would access
 * the purple property and <shade> would be a property on that color.
 * @param  {string} colorString - any color string, hex, rgb, <color>.<shade>, etc.
 * @return {string}
 * @example
 * // return "white"
 * getColor('white')
 *
 * // return "#2196f3"
 * getColor('blue.500')
 */
export function getColor(colorString: string) {
  const [color, shade] = colorString.split('.');
  return !shade ? color : (colors as any)[color][shade];
}
