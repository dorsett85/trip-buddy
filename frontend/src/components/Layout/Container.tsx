import styled, { css } from 'styled-components';
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
 * Container component that will horizontally center itself with default padding.
 *
 * ** NOTE ** Also needed When wrapping a Row component, which have negative margins
 * by default.  The padding must be greater than or equal to the negative margins used
 * in the Row component, otherwise there will be horizontal screen overflow.
 *
 * The fluid argument will disregard the set max-width breakpoints and always take up
 * 100% of the parent width.
 *
 * @see Row
 * @example
 * // The Container padding param must be greater than or equal to the Row gutter param
 * const Example = () => (
 *   <Container padding='md'>
 *     <Row gutter='md'>
 *       <Col>Hello</Col>
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
      const breakpointMaxWidth = breakpoints.values[sizeKey];

      // For smallest screen return null as we don't have to set the max width
      if (!breakpointMaxWidth) {
        return null;
      }

      return css`
        ${breakpoints.up(sizeKey)} {
          max-width: ${breakpointMaxWidth}px;
        }
      `;
    });

  return css`
    margin: 0 auto;
    padding: 0 ${spacing(padding)};
    ${breakpointStyles}
  `;
});

export default Container;
