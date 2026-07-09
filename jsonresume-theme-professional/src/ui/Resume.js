import React from 'react';
import { styled } from 'styled-components';
import Projects from './Projects';
import Hero from './Hero';
import Summary from './Summary';
import Education from './Education';
import Work from './Work';
import Certificates from './Certificates';
import Publications from './Publications';
import Awards from './Awards';
import Skills from './Skills';
import Interests from './Interests';
import Languages from './Languages';
import References from './References';

const Layout = styled.div`
  max-width: 660px;
  margin: 0 auto;
  line-height: 13.4688px;
  margin-bottom: 40px;

  /* Chrome's PDF renderer substitutes "ff"/"fi" pairs with single ligature
     glyphs (e.g. U+FB00 ﬀ). Some ATS text extractors don't decompose these
     back to plain characters, breaking keyword matching (e.g. "Buffalo"). */
  *, *::before, *::after {
    font-variant-ligatures: none;
    -webkit-font-feature-settings: "liga" 0, "clig" 0;
    font-feature-settings: "liga" 0, "clig" 0;
  }
`;

const Resume = ({ resume }) => {
  return (
    <Layout>
      <Hero basics={resume.basics} />
      <Summary basics={resume.basics} />
      <Education education={resume.education} />
      <Work work={resume.work} />
      <Projects projects={resume.projects} />
      <Certificates certificates={resume.certificates} />
      <Publications publications={resume.publications} />
      <Awards awards={resume.awards} />
      <Languages languages={resume.languages} />
      <Skills skills={resume.skills} />
      <Interests interests={resume.interests} />
      <References references={resume.references} />
    </Layout>
  );
};

export default Resume;
