import React from 'react';
import { styled } from 'styled-components';
const ListContainer = styled.ul`
  padding-left: 20px;
  line-height: 16px;
  li::before {
    content: '•';
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    line-height: 10px;
  }
`;
const List = ({
  items
}) => {
  if (!items) {
    return null;
  }
  return /*#__PURE__*/React.createElement(ListContainer, null, items.map(item => /*#__PURE__*/React.createElement("li", {
    key: item
  }, item)));
};
export default List;