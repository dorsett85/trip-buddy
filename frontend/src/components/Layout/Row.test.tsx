import React from 'react';
import { renderWithTheme } from '../../utils/renderWithTheme';
import Row from './Row';
import Col from './Col';

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
