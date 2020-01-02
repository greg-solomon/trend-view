import React from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { dark, white, blue } from "../utils/colors";
const InfoModal = ({ setToggleInfo, toggleInfo }) => {
  const showModal = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });
  return (
    <ModalWrapper style={showModal}>
      <ModalBody>
        <Text>
          Trend View takes snapshots of trending Twitter data in the United
          States and creates hourly photo-feeds.
        </Text>
        <CloseButton onClick={() => setToggleInfo(false)}>Close</CloseButton>
      </ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(animated.div)`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  width: 100%;
  font-size: 1.25rem;
  max-width: 280px;
  height: 200px;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const Text = styled.p`
  padding: 1.5rem 1rem;
`;

const CloseButton = styled.button`
  background-color: ${dark};
  padding: 0.5rem 1rem;
  color: ${white};
  border: none;
  margin: 0;
  margin-bottom: 3rem;
  &:hover {
    background-color: ${blue};
  }
`;

export default InfoModal;
