import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faHeart } from "@fortawesome/free-solid-svg-icons";
import colors from "../../utils/colors";

const Tweet = ({ image, text, url, trend, id, favorites, retweets, date }) => {
	const [isHover, setIsHover] = useState(false);

	const animation = useSpring({
		from: {
			opacity: 0,
			transform: "translate3d(0,-300px, 0)",
		},
		to: {
			opacity: 1,
			transform: "translate3d(0,0, 0)",
		},
	});

	const imageOverlay = useSpring({
		opacity: isHover ? 0.9 : 0,
	});

	const hoverEnter = () => {
		setIsHover(true);
	};

	const hoverLeave = () => {
		setIsHover(false);
	};

	return (
		<TweetWrapper key={id}>
			<TweetLink href={url} target="_blank" rel="noopener noreferrer">
				<Img src={image} alt={text} style={animation} />
				<TweetOverlay onMouseOver={hoverEnter} onMouseLeave={hoverLeave} style={imageOverlay}>
					<OverlayList>
						<ListItem>
							{retweets}&nbsp;
							<FontAwesomeIcon icon={faRetweet} color={colors.white} />
						</ListItem>
						<ListItem style={{ marginLeft: "8px" }}>
							{favorites}&nbsp;
							<FontAwesomeIcon icon={faHeart} color={colors.white} />
						</ListItem>
					</OverlayList>
					<Trend>{trend}</Trend>
				</TweetOverlay>
			</TweetLink>
		</TweetWrapper>
	);
};

const TweetWrapper = styled.div`
	display: block;
	position: relative;
	margin: 0 auto;
	padding: 0;
	width: 100%;
	height: 300px;
	background: transparent;
	@media (min-width: 600px) {
		height: 300px;
		width: 300px;
	}
`;

const Trend = styled.span`
	color: ${colors.white};
`;

const TweetOverlay = styled(animated.div)`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${colors.blue};
	color: ${colors.white};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	flex-direction: column;
`;

const OverlayList = styled.ul`
	list-style: none;
	display: flex;
	justify-content: center;
	align-items; center;
	padding: 2rem;
	margin: 0 auto;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.375rem;

	svg {
		margin-top: 4px;
	}
`;

const TweetLink = styled.a`
	cursor: pointer;
	padding: 0;
	margin: 0;
	height: 100%:
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`;
const Img = styled(animated.img)`
	object-fit: cover;
	object-position: center top;
	width: 100%;
	background: transparent;
	height: 100%;
`;

export default Tweet;
