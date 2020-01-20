import React from 'react';
import styled, { css } from 'styled-components';
import { render } from '@testing-library/react';
import { renderWithTheme } from './renderWithTheme';

const ComponentWithTheme = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing ? theme.spacing() : '20px'};
  `
);
const TEXT = 'Hello';

test('renderWithTheme gives component access to theme object', () => {
  const { getByText } = renderWithTheme(<ComponentWithTheme>{TEXT}</ComponentWithTheme>);
  const el = getByText(TEXT);
  expect(el).toBeInTheDocument();
  expect(getComputedStyle(el).padding).toBe('1rem');
});

test('No theme object will use fallback padding', () => {
  const { getByText } = render(<ComponentWithTheme>{TEXT}</ComponentWithTheme>);
  const el = getByText(TEXT);
  expect(el).toBeInTheDocument();
  expect(getComputedStyle(el).padding).toBe('20px');
});
