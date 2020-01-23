import React from 'react';
import AppText, { AppTextProps } from './AppText';
import { SUCCESSFUL_UPDATE_MESSAGE } from '../../utils/constants/messages';

const SuccessText: React.FC<Partial<AppTextProps>> = ({
  text = SUCCESSFUL_UPDATE_MESSAGE,
  color = 'green',
  element
}) => {
  return <AppText text={text} color={color} element={element} />;
};

export default SuccessText;
