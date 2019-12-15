import styled, { css } from 'styled-components';
import { memo } from 'react';
import { ThemeSizeArg, SizedType } from '../../styles/theme';

export interface ContainerProps {
  /**
   * If true, the container will always take up 100% of its parent width,
   * otherwise the breakpoints will readjust the maximum width of the container.
   */
  fluid?: boolean;
  /**
   * Add horizontal padding to the container
   */
  padding?: ThemeSizeArg;
}

/**
 * Container component used mostly to wrap (at any level of the component tree) the
 * Row component.  Since the Row component can have negative margins for proper content
 * alignment, the padding on the container balances out this negative margin.
 * 
 * ** NOTE ** The padding must be greater than or equal to the padding used in the Row
 * component, otherwise there will be horizontal screen overflow.
 * 
 * The fluid argument will disregard the set max-width breakpoints and always take up
 * 100% of the parent width.
 * 
 * @see Row
 * @example
 * const Example = () => (
 *   <Container padding='md'>
 *     <Row>
 *     
 *     </Row>
 *   </Container>
 * );
 */
const Container = styled.div<ContainerProps>(({ theme, fluid, padding = 'md' }) => {
  const { breakpoints, spacing } = theme;
  const breakpointStyles =
    !fluid &&
    Object.keys(breakpoints.values).map(key => {
      const sizeKey = key as keyof SizedType;
      // Get the breakpoint value and decrease the amount to add some extra horizontal margins
      const breakpointMaxWidth = breakpoints.values[sizeKey] * 0.9;

      return css`
        ${breakpoints.up(sizeKey)} {
          max-width: ${breakpointMaxWidth ? `${breakpointMaxWidth}px` : '100%'};
        }
      `;
    });

  return css`
    width: 100%;
    margin: 0 auto;
    padding: 0 ${spacing(padding)};
    ${breakpointStyles}
  `;
});

export default memo(Container);
