import React from 'react';
import Section from "./Section.js";
import Experience from "./Experience.js";
const Certificates = ({
  certificates
}) => {
  if (!certificates) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Certificates"
  }, certificates.map((c, key) => {
    return /*#__PURE__*/React.createElement(Experience, {
      title: c.name,
      subTitle: c.issuer,
      date: c.date,
      key: key
    });
  })));
};
export default Certificates;