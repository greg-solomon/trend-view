import React, { useState } from "react";
import Trend from "./Trend";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import colors from "../../utils/colors";

const Trends = ({ trends }) => {
  const [toggle, setToggle] = useState(false);
  const reveal = useSpring({
    transform: toggle ? "translate3d(0,100px, 0)" : "translate3d(0,0, 0)",
    opacity: toggle ? 1 : 0
  });
  return (
    <TrendWrapper>
      <RevealWrapper>
        <CTA onClick={() => setToggle(!toggle)}>
          All Trends{" "}
          <FontAwesomeIcon
            icon={faChevronRight}
            color={colors.blue}
            style={{
              transform: toggle ? "rotate(90deg)" : "rotate(0deg)",
              transition: "all 0.2s ease"
            }}
          />
        </CTA>
      </RevealWrapper>
      {toggle && (
        <ListWrapper style={reveal}>
          {trends.map(({ name, url }) => (
            <Trend trend={name} key={url} link={url} />
          ))}
        </ListWrapper>
      )}
    </TrendWrapper>
  );
};

const RevealWrapper = styled.div`
  width: 100%;
`;

const CTA = styled.button`
  border: none;
  padding: 1.2rem;
  font-size: 1.4rem;
  background: none;
  color: ${colors.dark};
  align-items: center;
  @media (min-width: 900px) {
    font-size: 1.8rem;
  }
  width: 100%;
  text-align: left;
`;

const ListWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const TrendWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 1rem auto;
`;
export default Trends;
