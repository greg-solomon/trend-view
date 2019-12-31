import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import SearchData from "./SearchData";

const SearchWrapper = () => {
  const animation = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(0,-50px, 0)"
    },
    to: {
      opacity: 1,
      transform: "translate3d(0,0, 0)"
    }
  });
  return (
    <SearchBox style={animation}>
      <SearchData />
    </SearchBox>
  );
};

const SearchBox = styled(animated.div)`
  width: 100%;
  height: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default SearchWrapper;
