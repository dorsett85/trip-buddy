import React from 'react';
import { renderWithTheme } from '../../utils/renderWithTheme';
import Col from './Col';

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
