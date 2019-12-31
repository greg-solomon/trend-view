import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../utils/colors";

const ViewHead = ({ date }) => {
  return (
    <Wrapper>
      <Date>Trends from {date}</Date>
      <Link
        to="/"
        className="change-date-link"
        style={{ color: colors.blue, marginRight: "1rem" }}
      >
        Change
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 900px;
  margin: 1rem auto;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled.p`
  font-size: 1.4rem;
  font-weight: 200;
  @media (min-width: 900px) {
    font-size: 2rem;
  }
  margin: 1rem 0;
  padding: 0;
  text-align: left;
  color: ${colors.dark};
  padding-left: 1rem;
`;

export default ViewHead;
