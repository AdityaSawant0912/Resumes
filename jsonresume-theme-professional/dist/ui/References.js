import React from 'react';
import { styled } from 'styled-components';
import Section from "./Section.js";
const Name = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 5px;
`;
const Reference = styled.p``;
const References = ({
  references
}) => {
  if (!references) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "References"
  }, references.map((r, key) => {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      style: {
        marginBottom: '15px'
      }
    }, /*#__PURE__*/React.createElement(Name, null, r.name), /*#__PURE__*/React.createElement(Reference, null, r.reference));
  })));
};
export default References;