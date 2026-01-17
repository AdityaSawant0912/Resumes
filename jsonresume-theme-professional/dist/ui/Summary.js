import React from 'react';
import { styled } from 'styled-components';
import Section from "./Section.js";
const Summary = styled.p``;
const SummaryComponent = ({
  basics
}) => {
  const {
    summary
  } = basics;
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    className: "secondary"
  }, /*#__PURE__*/React.createElement(Summary, null, summary)));
};
export default SummaryComponent;