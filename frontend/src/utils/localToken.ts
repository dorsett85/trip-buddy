import { TOKEN } from './constants/localStorage';

export const setLocalToken = (token: string): void => {
  localStorage.setItem(TOKEN, `Bearer ${token}`);
};

export const getLocalToken = (): string | null => localStorage.getItem(TOKEN);
export const removeLocalToken = (): void => localStorage.removeItem(TOKEN);
