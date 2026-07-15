import React from 'react';
import { styled } from 'styled-components';
import Section from "./Section.js";
import DateRange from "./DateRange.js";
import List from "./List.js";
const Container = styled.div`
  margin-bottom: 8px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
const Line = styled.div`
  font-size: 1.4rem;
`;
const Education = ({
  education
}) => {
  if (!education) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Education"
  }, education.map((e, key) => {
    const degree = e.area ? `${e.studyType} in ${e.area}` : e.studyType;
    const line = e.score ? `${degree}, ${e.institution} | ${e.score}` : `${degree}, ${e.institution}`;
    return /*#__PURE__*/React.createElement(Container, {
      key: key
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Line, null, line), /*#__PURE__*/React.createElement("div", {
      className: "secondary"
    }, /*#__PURE__*/React.createElement(DateRange, {
      startDate: e.startDate,
      endDate: e.endDate
    }))), /*#__PURE__*/React.createElement(List, {
      items: e.courses
    }));
  })));
};
export default Education;