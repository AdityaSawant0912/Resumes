import React from 'react';
import Section from "./Section.js";
import Experience from "./Experience.js";
const Publications = ({
  publications
}) => {
  if (!publications) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Publications"
  }, publications.map((p, key) => {
    return /*#__PURE__*/React.createElement(Experience, {
      title: p.name,
      subTitle: p.publisher,
      date: p.releaseDate,
      summary: p.summary,
      key: key
    });
  })));
};
export default Publications;