import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

const ThemeWrapper: React.FC = ({ children }) => <ThemeProvider theme={theme}>{children as any}</ThemeProvider>;

/**
 * Helper function that calls the @testing-library render function with our ThemeProvider as a wrapper.
 * Components rendered this way will have access to the theme object as a prop.
 */
export const renderWithTheme = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
  render(ui, {
    wrapper: ThemeWrapper,
    ...options
  });
