import React from 'react';
import { styled } from 'styled-components';
const Name = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
`;
const List = styled.div`
  font-size: 1.4rem;
  margin-left: 5px;
`;
const Container = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
`;
const OneLineList = ({
  name,
  items
}) => {
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Name, null, name, ":"), /*#__PURE__*/React.createElement(List, null, /*#__PURE__*/React.createElement("div", {
    class: "secondary"
  }, items.join(', '))));
};
export default OneLineList;