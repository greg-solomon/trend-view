import { gql } from "apollo-boost";
const TIMESTAMPS = gql`
	{
		timestamps {
			id
			date
		}
	}
`;

export default TIMESTAMPS;
