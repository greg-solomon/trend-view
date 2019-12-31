import React from "react";
import styled from "styled-components";

const ErrorPage = ({ error }) => {
	console.error(error);
	return (
		<PageWrapper>
			<h1>Woops! That's embarrassing</h1>
			<p>You're not supposed to see this page</p>
			<p>
				This was probably caused by too many successive server requests or there's a problem
				fetching available timestamps.
			</p>
		</PageWrapper>
	);
};

const PageWrapper = styled.div`
	min-height: 90vh;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
`;
export default ErrorPage;
