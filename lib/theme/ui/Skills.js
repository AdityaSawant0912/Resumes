import React from 'react';
import OneLineList from "./OneLineList.js";
import Section from "./Section.js";
const Skills = ({
  skills
}) => {
  if (!skills) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Skills"
  }, skills.map((w, key) => {
    return /*#__PURE__*/React.createElement(OneLineList, {
      key: key,
      name: w.name,
      items: w.keywords
    });
  })));
};
export default Skills;