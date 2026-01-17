import React from 'react';
import Section from "./Section.js";
import Experience from "./Experience.js";
const Work = ({
  work
}) => {
  if (!work) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Experience"
  }, work.map((w, key) => {
    return /*#__PURE__*/React.createElement(Experience, {
      title: w.position,
      subTitle: w.name,
      startDate: w.startDate,
      endDate: w.endDate,
      summary: w.summary,
      highlights: w.highlights,
      key: key
    });
  })));
};
export default Work;