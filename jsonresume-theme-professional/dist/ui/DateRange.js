import React from 'react';
import { styled } from 'styled-components';
import Date from "./Date.js";
const Range = styled.div`
  display: flex;
  font-style: italic;
  font-size: 13px;
`;
const DateRange = ({
  startDate,
  endDate
}) => {
  return /*#__PURE__*/React.createElement(Range, null, /*#__PURE__*/React.createElement(Date, {
    date: startDate
  }), "\xA0\u2014\xA0", /*#__PURE__*/React.createElement(Date, {
    date: endDate
  }));
};
export default DateRange;