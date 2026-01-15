import React from 'react';
import { styled } from 'styled-components';
import List from "./List.js";
import DateRange from "./DateRange.js";
import Date from "./Date.js";
const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 1.45rem;
  margin-bottom: 3px;
`;
const SubTitle = styled.div`
  font-style: italic;
  font-size: 1.4rem;
  margin-bottom: 3px;
`;
const Container = styled.div`
  margin-bottom: 10px;
`;
const Summary = styled.p`
  margin-bottom: 5px;
`;
const Experience = ({
  title,
  date,
  startDate,
  endDate,
  subTitle,
  summary,
  highlights
}) => {
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Meta, null, /*#__PURE__*/React.createElement(Title, null, title), /*#__PURE__*/React.createElement("div", {
    className: "secondary"
  }, date ? /*#__PURE__*/React.createElement(Date, {
    date: date
  }) : /*#__PURE__*/React.createElement(DateRange, {
    startDate: startDate,
    endDate: endDate
  }))), subTitle && /*#__PURE__*/React.createElement(SubTitle, null, subTitle), /*#__PURE__*/React.createElement("div", {
    className: "secondary"
  }, summary && /*#__PURE__*/React.createElement(Summary, null, summary), /*#__PURE__*/React.createElement(List, {
    items: highlights
  })));
};
export default Experience;