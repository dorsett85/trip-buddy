import React from 'react';
import AppText, { AppTextProps } from './AppText';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../utils/constants/errors';

const ErrorText: React.FC<Partial<AppTextProps>> = ({
  text = INTERNAL_SERVER_ERROR_MESSAGE,
  color = 'red',
  element
}) => {
  return <AppText text={text} color={color} element={element} />;
};

export default ErrorText;
