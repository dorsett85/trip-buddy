import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { SizedType, themeSizes } from '../../styles/theme';

/**
 * Number of columns in our grid
 */
export const colWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type ColWidth = typeof colWidths[number];
const GRID_SIZE = 12 as const;

export type OffsetWidth = Exclude<ColWidth, 12> | 0;

interface ColProps {
  /**
   * Enter a ColWidth value, or enter an object of SizedType to enable
   * different breakpoint widths (e.g., entering 12 will set the width to 12
   * regardless of screen size, but entering { xs: 12, md: 6 } would give you
   * 12 columns on extra small screens, but 6 columns on medium screens).
   */
  width?: Partial<SizedType<ColWidth>> | ColWidth;
  /**
   * Similar to width prop, this accepts a ColWidth to offset the column
   * from the left (e.g., entering 2 would move the column two columns from the
   * left, but entering { xs: 0, md: 3} would give you zero offset columns on
   * extra small screens and 3 offset columns on medium screens).
   */
  offset?: Partial<SizedType<OffsetWidth>> | OffsetWidth;
}

/**
 * Calculate width percentage
 *
 * Helper function that takes a column width and returns a number as a percentage
 * of the entire grid
 */
const calcWidthPct = (width: ColWidth | OffsetWidth): number => (+width / GRID_SIZE) * 100;

/**
 * Meat and potatoes of our grid system.  In order to work properly with multiple
 * columns, all of the Col components must be wrapped in a single Row component.
 *
 * You can specify both a width for the Col, as well as an offset.  You can also
 * specify the widths and offsets at different breakpoints.
 *
 * @see Row
 * @example
 * // Row with two columns that each take up half of the grid
 * const Example = () => (
 *   <Row>
 *     <Col width={6}>Col-6</Col>
 *     <Col width={6}>Col-6</Col>
 *   </Row>
 * )
 *
 * // Row with two columns that take up four columns offset by two on medium
 * // screens and small gutter spacing
 * const Example2 = () => (
 *   <Row gutter='sm'>
 *     <Col width={{ md: 4 }} offset={{ md: 2 }}>Col-md-4, Offset-md-2</Col>
 *     <Col width={{ md: 4 }} offset={{ md: 2 }}>Col-md-4, Offset-md-2</Col>
 *   </Row>
 * );
 */
const Col = styled.div<ColProps>(({ theme, width, offset }) => {
  // Calculate the base width and offset before adding breakpoints
  const baseFlexGrow = typeof width === 'number' ? 0 : 1;
  const baseFlexBasis = typeof width === 'number' ? `${calcWidthPct(width)}%` : 'auto';
  const baseMaxWidth = typeof width === 'number' ? calcWidthPct(width) : 100;
  const baseOffset = typeof offset === 'number' ? calcWidthPct(offset) : 0;

  // Add media queries for column widths and offsets
  const mediaQueries: FlattenSimpleInterpolation[] = [];
  themeSizes.forEach(size => {
    const colWidth = typeof width === 'object' && width[size];
    const colOffset = typeof offset === 'object' && offset[size];
    if (colWidth || colOffset) {
      mediaQueries.push(css`
        ${theme.breakpoints.up(size)} {
          ${colWidth &&
            css`
              flex-basis: ${calcWidthPct(colWidth)}%;
              max-width: ${calcWidthPct(colWidth)}%;
            `}
          ${colOffset &&
            css`
              margin-left: ${calcWidthPct(colOffset)}%;
            `}
        }
      `);
    }
  });

  return css`
    flex-grow: ${baseFlexGrow};
    flex-basis: ${baseFlexBasis};
    max-width: ${baseMaxWidth}%;
    margin-left: ${baseOffset}%;
    ${mediaQueries}
  `;
});

export default Col;
