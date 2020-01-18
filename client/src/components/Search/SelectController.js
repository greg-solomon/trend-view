import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import parseTimestamps from '../../utils/parseTimestamps';
import parseTimeOptions from '../../utils/parseTimeOptions';
import colors from '../../utils/colors';
import PropTypes from 'prop-types';
const SelectController = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [isTimeDisabled, setIsTimeDisabled] = useState(true);
  const [timeOptions, setTimeOptions] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const timestamps = parseTimestamps(data);

  const dateChange = selectedOption => {
    setSelectedDate(selectedOption);
    setTimeOptions(parseTimeOptions(selectedOption.value));
    setIsTimeDisabled(false);
    setIsDateSelected(true);
  };

  const timeChange = selectedOption => {
    setSelectedTime(selectedOption);
    setIsTimeSelected(true);
  };

  const timeFadeIn = useSpring({ opacity: isDateSelected ? 1 : 0 });
  const CTAFadeIn = useSpring({ opacity: isTimeSelected ? 1 : 0 });
  return (
    <Wrapper>
      <CTA style={{ marginBottom: '1rem' }}>
        Browse photos from hourly US Twitter Trends
      </CTA>
      <SelectWrapper>
        <CTA>Select a Date</CTA>
        <Select
          value={selectedDate}
          options={timestamps}
          onChange={dateChange}
        />
      </SelectWrapper>
      <SelectWrapper style={timeFadeIn}>
        <CTA>Select a Time</CTA>
        <Select
          value={selectedTime}
          options={timeOptions}
          onChange={timeChange}
          isDisabled={isTimeDisabled}
        />
      </SelectWrapper>
      <LinkWrapper style={CTAFadeIn}>
        <Link to={`/trends/${selectedTime.value}`} style={linkStyles}>
          View Trends
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
};

const linkStyles = {
  width: '100%',
  maxWidth: '300px',
  textAlign: 'center',
  textDecoration: 'none',
  color: colors.white,
  background: colors.blue,
  padding: '0.5rem 0',
  borderRadius: '8px',
  boxShadow: `0px 0px 5px ${colors.dark}`,
  margin: '0 auto',
  cursor: 'pointer',
  fontSize: '1.25rem'
};

const SelectWrapper = styled(animated.div)`
  max-width: 300px;
  width: 100%;
  margin: 1rem auto;
`;

const CTA = styled.h2`
  font-weight: 100;
  color: ${colors.dark};
  margin: 0 auto;
  text-align: left;
  font-size: 1rem;
  padding-bottom: 0.5rem;

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
  @media (min-width: 900px) {
    font-size: 1.75rem;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LinkWrapper = styled(animated.div)`
  width: 100%;
  margin: 1rem auto;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectController;
