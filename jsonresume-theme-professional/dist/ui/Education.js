import React from 'react';
import Section from "./Section.js";
import Experience from "./Experience.js";
const Education = ({
  education
}) => {
  if (!education) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Education"
  }, education.map((e, key) => {
    let subTitle = e.area ? `${e.studyType} in ${e.area}` : e.studyType;
    if (e.score) {
      subTitle = `${subTitle} (${e.score})`;
    }
    return /*#__PURE__*/React.createElement(Experience, {
      title: e.institution,
      subTitle: subTitle,
      startDate: e.startDate,
      endDate: e.endDate,
      highlights: e.courses,
      key: key
    });
  })));
};
export default Education;