import React from 'react';
import { styled } from 'styled-components';
const Text = styled.div`
  font-size: 22px;
  font-weight: 600;
`;
const SubTitle = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(Text, null, children);
};
export default SubTitle;