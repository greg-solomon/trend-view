const { gql } = require("apollo-server-express");

// GraphQL Schema
const typeDefs = gql`
	type Timestamp {
		id: ID!
		date: String!
	}

	type Trend {
		name: String!
		url: String!
		promoted_content: Boolean
		query: String!
		tweet_volume: Int
		as_of: String!
		created_at: String!
		tweets: [Tweet]
		timestamps: [Timestamp]
	}

	type Tweet {
		id: ID!
		created_at: String!
		text: String
		url: String!
		media_url: String!
		trends: [Trend]
		user: String!
		user_display_pic: String!
		name: String!
		retweet_count: Int
		favorite_count: Int
	}

	type Query {
		timestamps: [Timestamp!]!
		trendsByTime(id: String!): [Trend!]!
	}
`;

module.exports = typeDefs;
