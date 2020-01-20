import React from 'react';
import { renderWithTheme } from '../../utils/renderWithTheme';
import Container from './Container';
import Row from './Row';
import Col from './Col';

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
