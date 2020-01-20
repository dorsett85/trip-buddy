import styled, { css } from 'styled-components';
import { ThemeSizeArg } from '../../styles/theme';

export interface RowProps {
  /**
   * Spacing between immediate child elements (meant to be Col component
   * children).  The spacing is translated to left/right/bottom padding of
   * the child components.
   */
  gutter?: ThemeSizeArg;
}

/**
 * Row component use in conjunction with child Col components.  Wrapping
 * multiple Col components in a Row component will properly display the
 * columns in our 12 column grid.
 *
 * ** NOTE ** The default gutter argument will create negative margins so that
 * the columns line up properly on the left and right.  To correct the possible
 * screen overflow in this situation, the Row must be wrapped in a component that
 * has left and right spacing greater than or equal to the negative margins (default
 * gutter is 'md', which equates to 1rem, so the parent has to have spacing greater
 * than that, or if gutter is set to 'xl', the parent must have spacing greater than
 * or equal to that).
 *
 * A row with gutter={0} property will not have negative margins.
 *
 * @see Container
 * @see Col
 * @example
 * // Row with no gutters (no wrapper needed)
 * const Example = () => (
 *   <Row gutter={0}>
 *     <Col>Hello</Col>
 *     <Col>Hello</Col>
 *   </Row>
 * );
 *
 * // Row with gutters (must be wrapped in a component with positive spacing to avoid
 * // screen overflow).  Notice that the Container component has padding='md' to
 * // account for the gutter='md' of the Row component.
 * const Example2 = () => (
 *   <Container padding='md'>
 *     <Row gutter='md'>
 *       <Col>Hello</Col>
 *       <Col>Hello</Col>
 *     </Row>
 *   </Container>
 * );
 */
const Row = styled.div<RowProps>(
  ({ theme, gutter = 'md' }) => css`
    display: flex;
    flex-wrap: wrap;
    ${gutter &&
      css`
        margin: 0 -${theme.spacing(gutter)};
        > * {
          padding-left: ${theme.spacing(gutter)};
          padding-right: ${theme.spacing(gutter)};
          padding-bottom: ${theme.spacing(gutter)};
          box-sizing: border-box;
        }
      `}
  `
);

export default Row;
