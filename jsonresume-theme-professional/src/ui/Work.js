import React from 'react';
import { styled } from 'styled-components';
import Section from './Section';
import Experience from './Experience';
import DateRange from './DateRange';
import List from './List';
import LinkIcon from './LinkIcon';

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
const groupByCompany = (work) => {
  const groups = new Map();
  work.forEach((w) => {
    if (!groups.has(w.name)) groups.set(w.name, []);
    groups.get(w.name).push(w);
  });
  return [...groups.values()];
};

const CompanyGroup = ({ roles }) => {
  const { name, url } = roles[0];
  return (
    <Container>
      <Company>
        {url ? (
          <CompanyLink href={url} target="_blank" rel="noopener noreferrer">
            {name}
            <LinkIcon />
          </CompanyLink>
        ) : (
          name
        )}
      </Company>
      {roles.map((r, key) => (
        <div key={key}>
          <Meta>
            <Role>{r.position}</Role>
            <div className="secondary">
              <DateRange startDate={r.startDate} endDate={r.endDate} />
            </div>
          </Meta>
          <div className="secondary">
            <List items={r.highlights} />
          </div>
        </div>
      ))}
    </Container>
  );
};

const Work = ({ work }) => {
  if (!work) {
    return null;
  }

  return (
    <div>
      <Section title="Experience">
        {groupByCompany(work).map((roles, key) => {
          if (roles.length > 1) {
            return <CompanyGroup roles={roles} key={key} />;
          }
          const w = roles[0];
          return (
            <Experience
              title={w.position}
              url={w.url}
              subTitle={w.name}
              startDate={w.startDate}
              endDate={w.endDate}
              summary={w.summary}
              highlights={w.highlights}
              key={key}
            />
          );
        })}
      </Section>
    </div>
  );
};

export default Work;
