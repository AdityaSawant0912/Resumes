import React from 'react';
import { styled } from 'styled-components';
import { FaMapPin, FaEnvelope, FaGithub, FaTwitter, FaPhoneAlt, FaLink, FaLinkedin } from 'react-icons/fa';
import Section from "./Section.js";
const Title = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const BasicInfo = styled.div`
  display: flex;
  gap: 10px 20px;
  justify-content: center;
  flex-wrap: wrap;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  svg {
    color: #000;
    margin-right: 5px;
    width: 10px;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: #000;
    }
  }
`;
const HeroComponent = ({
  basics
}) => {
  const {
    name,
    url,
    location,
    profiles,
    phone,
    email
  } = basics;
  const linkedin = profiles.find(({
    network
  }) => network === 'linkedin');
  const github = profiles.find(({
    network
  }) => network === 'github');
  const twitter = profiles.find(({
    network
  }) => network === 'twitter');
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Title, null, name), /*#__PURE__*/React.createElement("div", {
    className: "secondary"
  }, /*#__PURE__*/React.createElement(BasicInfo, null, location && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaMapPin, null), location.city, ", ", location.countryCode), email && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaEnvelope, null), email), phone && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaPhoneAlt, null), phone), url && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaLink, null), /*#__PURE__*/React.createElement("a", {
    href: url
  }, url)), linkedin && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaLinkedin, null), /*#__PURE__*/React.createElement("a", {
    href: `https://linkedin.com/${linkedin.username}`
  }, linkedin.username)), github && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaGithub, null), /*#__PURE__*/React.createElement("a", {
    href: `https://github.com/${github.username}`
  }, github.username)), twitter && /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(FaTwitter, null), /*#__PURE__*/React.createElement("a", {
    href: `https://twitter.com/${twitter.username}`
  }, twitter.username)))));
};
export default HeroComponent;