import React from 'react';
import OneLineList from "./OneLineList.js";
import Section from "./Section.js";
const Interests = ({
  interests
}) => {
  // check if interests is null, empty, empty string or empty array

  if (!interests) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Interests"
  }, interests.map((w, key) => {
    return /*#__PURE__*/React.createElement(OneLineList, {
      key: key,
      name: w.name,
      items: w.keywords
    });
  })));
};
export default Interests;