import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

type TextTags = 'a' | 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface AppTextProps {
  text: string;
  color?: keyof typeof theme['colors'];
  element?: TextTags;
}

const Text = styled.div<Pick<AppTextProps, 'color'>>(
  ({ color }) => css`
    color: ${color || 'inherit'};
  `
);

const AppText: React.FC<AppTextProps> = ({ text, color, element = 'span' }) => {
  return (
    <Text as={element} color={color}>
      {text}
    </Text>
  );
};

export default AppText;
