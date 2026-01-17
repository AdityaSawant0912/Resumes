import React from 'react';
import { styled } from 'styled-components';
const Section = styled.div`
  max-width: 700px;
  margin: 0 auto 18px;

  h2 {
    margin: 0;
    padding: 0;
    margin-bottom: 3px;
    font-weight: 600;
  }

  hr {
    margin: 0;
    padding: 0;
    margin-top: 7px;
    margin-bottom: 3px;
  }
`;
const Container = styled.div`
  margin: 0 8px;
`;
const SectionComponent = ({
  children,
  title
}) => {
  return /*#__PURE__*/React.createElement(Section, null, title && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, title), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement(Container, null, children));
};
export default SectionComponent;