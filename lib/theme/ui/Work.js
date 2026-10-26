import React from 'react';
import { styled } from 'styled-components';
import Section from "./Section.js";
import Experience from "./Experience.js";
import DateRange from "./DateRange.js";
import List from "./List.js";
import LinkIcon from "./LinkIcon.js";
const Container = styled.div`
  margin-bottom: 10px;
`;
const Company = styled.div`
  font-weight: 600;
  font-size: 1.45rem;
  margin-bottom: 3px;
`;
const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;
const Role = styled.div`
  font-style: italic;
  font-size: 1.4rem;
  margin-bottom: 3px;
`;
const CompanyLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Entries sharing a company name merge into one block, kept at the first entry's position
const groupByCompany = work => {
  const groups = new Map();
  work.forEach(w => {
    if (!groups.has(w.name)) groups.set(w.name, []);
    groups.get(w.name).push(w);
  });
  return [...groups.values()];
};
const CompanyGroup = ({
  roles
}) => {
  const {
    name,
    url
  } = roles[0];
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Company, null, url ? /*#__PURE__*/React.createElement(CompanyLink, {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, name, /*#__PURE__*/React.createElement(LinkIcon, null)) : name), roles.map((r, key) => /*#__PURE__*/React.createElement("div", {
    key: key
  }, /*#__PURE__*/React.createElement(Meta, null, /*#__PURE__*/React.createElement(Role, null, r.position), /*#__PURE__*/React.createElement("div", {
    className: "secondary"
  }, /*#__PURE__*/React.createElement(DateRange, {
    startDate: r.startDate,
    endDate: r.endDate
  }))), /*#__PURE__*/React.createElement("div", {
    className: "secondary"
  }, /*#__PURE__*/React.createElement(List, {
    items: r.highlights
  })))));
};
const Work = ({
  work
}) => {
  if (!work) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    title: "Experience"
  }, groupByCompany(work).map((roles, key) => {
    if (roles.length > 1) {
      return /*#__PURE__*/React.createElement(CompanyGroup, {
        roles: roles,
        key: key
      });
    }
    const w = roles[0];
    return /*#__PURE__*/React.createElement(Experience, {
      title: w.position,
      url: w.url,
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