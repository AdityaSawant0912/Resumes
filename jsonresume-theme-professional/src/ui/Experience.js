import React from 'react';
import { styled } from 'styled-components';
import List from './List';
import DateRange from './DateRange';
import Date from './Date';
import LinkIcon from './LinkIcon';

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.45rem;
  margin-bottom: 3px;
`;

const SubTitle = styled.div`
  font-style: italic;
  font-size: 1.4rem;
  margin-bottom: 3px;
`;

const Container = styled.div`
  margin-bottom: 10px;
`;

const Summary = styled.p`
  margin-bottom: 5px;
`;

const TitleLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Experience = ({
  title,
  url,
  date,
  startDate,
  endDate,
  subTitle,
  summary,
  highlights,
}) => {
  return (
    <Container>
      <Meta>
        <Title>
          {url ? (
            <TitleLink href={url} target="_blank" rel="noopener noreferrer">
              {title}
              <LinkIcon />
            </TitleLink>
          ) : (
            title
          )}
        </Title>
        <div className="secondary">
          {date ? (
            <Date date={date} />
          ) : (
            <DateRange startDate={startDate} endDate={endDate} />
          )}
        </div>
      </Meta>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <div className="secondary">
        {summary && <Summary>{summary}</Summary>}
        <List items={highlights} />
      </div>
    </Container>
  );
};

export default Experience;
