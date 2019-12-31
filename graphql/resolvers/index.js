const { storeTrends, storeTweets } = require("../../lib/cron/twitter");
const Trend = require("../../models/Trend");
const Tweet = require("../../models/Tweet");
const Timestamp = require("../../models/Timestamp");
import { transformTimestamp, transformTrend, transformTweet } from "../merge";
const rootResolver = {
	Query: {
		timestamps: async () => {
			try {
				const timestamps = await Timestamp.find();
				return timestamps.map(ts => transformTimestamp(ts));
			} catch (e) {
				console.error(e);
			}
		},
		trendsByTime: async (parent, args) => {
			try {
				const { id } = args;
				const trends = await Trend.find({ timestamps: id });
				return trends.map(trend => transformTrend(trend));
			} catch (e) {
				console.error(e);
			}
		},
	},
};

module.exports = rootResolver;
