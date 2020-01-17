import React from 'react';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import { animated } from 'react-spring';
import PropTypes from 'prop-types';

import colors from '../utils/colors';

const Loading = ({ message, style }) => {
  return (
    <Wrapper style={style}>
      <Message>{message}</Message>
      <BounceLoader
        css={{
          display: 'block',
          margin: '1rem'
        }}
        size={60}
        color={colors.blue}
        loading
      />
    </Wrapper>
  );
};

const Wrapper = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;

const Message = styled.p`
  width: 100%;
  font-size: 1.4rem;
  margin: 1rem auto;
  text-align: center;
  font-weight: 200;
  @media (min-width: 900px) {
    font-size: 2rem;
  }
`;

Loading.propTypes = {
  message: PropTypes.string.isRequired
};

export default Loading;
