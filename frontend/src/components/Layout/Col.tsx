import styled, { css } from 'styled-components';
import { memo } from 'react';
import { SizedType } from '../../styles/theme';

/**
 * Number of columns in our grid
 */
const GRID_SIZE = 12 as const;

/**
 * All possible column width values
 */
type ColWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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
  offset?: Partial<SizedType<ColWidth>> | ColWidth;
}

/**
 * Calculate width percentage
 * 
 * Helper function that takes a column width and returns a number as a percentage
 * of the entire grid
 */
const calcWidthPct = (width: ColWidth): number => (+width / GRID_SIZE) * 100;

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

  // Add column width breakpoints
  const breakpointWidths =
    typeof width === 'object' &&
    Object.keys(width).map(key => {
      const sizeKey = key as keyof SizedType;
      const colWidth = width[sizeKey]!;
      return css`
        ${theme.breakpoints.up(sizeKey)} {
          flex-basis: ${calcWidthPct(colWidth)}%;
          max-width: ${calcWidthPct(colWidth)}%;
        }
      `;
    });

  // Add offset width breakproints
  const offsetWidths =
    typeof offset === 'object' &&
    Object.keys(offset).map(key => {
      const sizeKey = key as keyof SizedType;
      const colWidth = offset[sizeKey]!;
      return css`
        ${theme.breakpoints.up(sizeKey)} {
          margin-left: ${calcWidthPct(colWidth)}%;
        }
      `;
    });

  return css`
    flex-grow: ${baseFlexGrow};
    flex-basis: ${baseFlexBasis};
    max-width: ${baseMaxWidth}%;
    margin-left: ${baseOffset}%;
    ${breakpointWidths}
    ${offsetWidths}
  `;
});

export default memo(Col);