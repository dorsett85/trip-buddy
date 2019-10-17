import { isEmptyObject } from './isEmptyObject';

describe('isEmptyObject', () => {
  it('should return true', () => {
    const isEmpty = isEmptyObject({});
    expect(isEmpty).toBe(true);
  });

  it('should return false', () => {
    const isEmpty = isEmptyObject({ notEmpty: true });
    expect(isEmpty).toBe(false);
  });
});
