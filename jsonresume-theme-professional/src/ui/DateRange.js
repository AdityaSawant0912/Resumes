import React from 'react';
import { styled } from 'styled-components';
import Date from './Date';

const Range = styled.div`
  display: flex;
  font-style: italic;
  font-size: 12px;
`;

const DateRange = ({ startDate, endDate }) => {
  return (
    <Range>
      <Date date={startDate} />
      &nbsp;—&nbsp;
      <Date date={endDate} />
    </Range>
  );
};

export default DateRange;
