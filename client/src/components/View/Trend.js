import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

const Trend = ({ trend, link }) => {
	return (
		<Link href={link} target="_blank" rel="noreferrer noopener">
			{trend}
		</Link>
	);
};
const { white, blue, dark } = colors;
const Link = styled.a`
	padding: 0.5rem 1rem;
	font-size: 0.8rem;
	text-decoration: none;
	background-color: ${blue};
	color: ${white};
	border-radius: 20px;
	margin: 0.5rem 0.5rem;
	font-weight: 600;
	box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);

	@media (min-width: 900px) {
		font-size: 1rem;
	}

	transition: all 0.2s ease;
	&:hover {
		background-color: ${dark};
	}
`;
export default Trend;
