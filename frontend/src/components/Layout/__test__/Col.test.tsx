import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Col } from '..';

const renderWithTheme = (component: React.Component) =>
  render(component, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
  });

test('Col component render and query', () => {
  const TEXT = 'Hello';
  const { queryByText } = renderWithTheme(<Col>{TEXT}</Col>);
  const el = queryByText(TEXT);
  expect(el).toBeInTheDocument();
});

test('Col component render with props', () => {
  const TEXT = 'Hello';
  const { queryByText } = renderWithTheme(
    <Col width={1} offset={{ xs: 0, sm: 1 }}>
      {TEXT}
    </Col>
  );
  const el = queryByText(TEXT);
  expect(el).toBeInTheDocument();
});
