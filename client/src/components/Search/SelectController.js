import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import parseTimestamps from "../../utils/parseTimestamps";
import parseTimeOptions from "../../utils/parseTimeOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import colors from "../../utils/colors";
const SelectController = ({ data, toggleInfo, setToggleInfo }) => {
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [isTimeDisabled, setIsTimeDisabled] = useState(true);
  const [timeOptions, setTimeOptions] = useState([]);
  const [infoColor, setInfoColor] = useState(colors.dark);
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

  const infoHover = () => {
    setInfoColor(colors.blue);
  };

  const infoLeave = () => {
    setInfoColor(colors.dark);
  };

  const timeFadeIn = useSpring({ opacity: isDateSelected ? 1 : 0 });
  const CTAFadeIn = useSpring({ opacity: isTimeSelected ? 1 : 0 });
  return (
    <Wrapper>
      <SelectWrapper>
        <h2 style={{ fontWeight: "100" }}>Select a Date</h2>
        <Select
          value={selectedDate}
          options={timestamps}
          onChange={dateChange}
        />
      </SelectWrapper>
      <SelectWrapper style={timeFadeIn}>
        <h2 style={{ fontWeight: "100" }}>Select a Time</h2>
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
      <InfoButton onClick={() => setToggleInfo(!toggleInfo)}>
        <FontAwesomeIcon
          icon={faInfoCircle}
          size="3x"
          color={infoColor}
          onMouseEnter={infoHover}
          onMouseLeave={infoLeave}
        />
      </InfoButton>
    </Wrapper>
  );
};

const linkStyles = {
  textDecoration: "none",
  color: colors.white,
  background: colors.blue,
  padding: "0.5rem 1.5rem",
  borderRadius: "8px",
  boxShadow: `0px 0px 5px ${colors.dark}`,
  margin: "0 auto",
  cursor: "pointer"
};

const InfoButton = styled.button`
  border: none;
  background: none;
  padding: 1rem;
  cursor: pointer;
  margin: 2rem auto;
`;

const SelectWrapper = styled(animated.div)`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  position: absolute;
`;

const LinkWrapper = styled(animated.div)`
  width: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectController;