import React from 'react';
import { styled } from 'styled-components';
import Section from './Section';
import DateRange from './DateRange';
import List from './List';

const Container = styled.div`
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Line = styled.div`
  font-size: 1.4rem;
`;

const Education = ({ education }) => {
  if (!education) {
    return null;
  }

  return (
    <div>
      <Section title="Education">
        {education.map((e, key) => {
          const degree = e.area ? `${e.studyType} in ${e.area}` : e.studyType;
          const line = e.score
            ? `${degree}, ${e.institution} | ${e.score}`
            : `${degree}, ${e.institution}`;

          return (
            <Container key={key}>
              <Row>
                <Line>{line}</Line>
                <div className="secondary">
                  <DateRange startDate={e.startDate} endDate={e.endDate} />
                </div>
              </Row>
              <List items={e.courses} />
            </Container>
          );
        })}
      </Section>
    </div>
  );
};

export default Education;
