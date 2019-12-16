import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Row, Col } from '..';

const renderWithTheme = (component: React.Component) =>
  render(component, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
  });

test('Row component render and query', () => {
  const TEXT = 'Hello';
  const { queryByText } = renderWithTheme(<Row>{TEXT}</Row>);
  const el = queryByText(TEXT);
  expect(el).toBeInTheDocument();
});

test('Row component render with Col', () => {
  const TEXT = 'Hello';
  const { queryByText } = renderWithTheme(
    <Row gutter={0}>
      <Col>{TEXT}</Col>
    </Row>
  );
  const el = queryByText(TEXT);
  expect(el).toBeInTheDocument();
});
