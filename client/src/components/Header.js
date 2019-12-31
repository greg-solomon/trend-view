import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Header = () => {
  const [iconColor, setIconColor] = useState(colors.dark);
  const [appNameColor, setAppNameColor] = useState(colors.dark);

  const iconHover = () => {
    setIconColor(colors.blue);
  };

  const hoverLeave = () => {
    setIconColor(colors.dark);
  };

  const appHover = () => {
    setAppNameColor(colors.blue);
  };

  const appLeave = () => {
    setAppNameColor(colors.dark);
  };
  return (
    <HeaderWrapper>
      <Link
        to="/"
        className="header-link"
        style={{ color: appNameColor }}
        onMouseEnter={appHover}
        onMouseLeave={appLeave}
      >
        Trend View
      </Link>
      <a
        href="https://github.com/greg-solomon/trend-view"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faGithub}
          onMouseEnter={iconHover}
          onMouseLeave={hoverLeave}
          color={iconColor}
          size="3x"
        />
      </a>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  height: 10vh;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -10px 20px ${colors.dark};
`;
export default Header;
