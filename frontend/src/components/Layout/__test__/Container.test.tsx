import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Container, Row, Col } from '..';

const renderWithTheme = (component: React.Component) =>
  render(component, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
  });

test('Container component render and query', () => {
  const TEXT = 'Hello';
  const { queryByText } = renderWithTheme(<Container>{TEXT}</Container>);
  const el = queryByText(TEXT);
  expect(el).toBeInTheDocument();
});

test('Container component render with Row and Col', () => {
  const TEXT = 'Hello';
  const { queryByText } = renderWithTheme(
    <Container fluid>
      <Row>
        <Col>{TEXT}</Col>
      </Row>
    </Container>
  );
  const el = queryByText(TEXT);
  expect(el).toBeInTheDocument();
});
