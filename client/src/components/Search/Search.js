import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import SearchData from './SearchData';
import PropTypes from 'prop-types';

const SearchWrapper = ({ setToggleInfo, toggleInfo }) => {
  const animation = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(0,-50px, 0)'
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0, 0)'
    }
  });
  return (
    <SearchBox style={animation}>
      <SearchData />
    </SearchBox>
  );
};

SearchWrapper.propTypes = {
  setToggleInfo: PropTypes.func.isRequired,
  toggleInfo: PropTypes.bool.isRequired
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
