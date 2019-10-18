import { getToken } from './getToken';

describe('getToken function', () => {
  it('should return null', () => {
    const token = getToken('asdfasdfasdfas');
    expect(token).toBeNull();
  });

  it('should return a token', () => {
    const secretToken = 'secretToken';
    const token = getToken(`Bearer ${secretToken}`);
    expect(token).toBe(secretToken);
  });

  it('should return a token using a different type', () => {
    const type = 'Basic';
    const secretToken = 'secretToken';
    const token = getToken(`${type} ${secretToken}`, type);
    expect(token).toBe(secretToken);
  });
});
