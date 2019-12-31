import Timestamp from "../models/Timestamp";
import Tweet from "../models/Tweet";
import Trend from "../models/Trend";

const timestamps = async tsIds => {
	try {
		const ts = await Timestamp.find({ _id: { $in: tsIds } });
		return ts.map(timestamp => {
			return transformTimestamp(timestamp);
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const trends = async trendIds => {
	try {
		const trends = await Trend.find({ _id: { $in: trendIds } });
		return trends.map(trend => transformTrend(trend));
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const tweets = async tweetIds => {
	try {
		const tweets = await Tweet.find({ _id: { $in: tweetIds } });
		return tweets.map(tweet => transformTweet(tweet));
	} catch (error) {
		console.error(error);
		throw error;
	}
};
const transformTimestamp = timestamp => {
	return {
		id: timestamp.id,
		date: timestamp.date.toISOString(),
	};
};

const transformTweet = tweet => {
	return {
		...tweet._doc,
		id: tweet.id,
		trends: trends.bind(this, tweet.trends),
	};
};

const transformTrend = async trend => {
	return {
		...trend._doc,
		id: trend.id,
		timestamps: timestamps.bind(this, trend.timestamps),
		tweets: tweets.bind(this, trend.tweets),
	};
};

export { transformTimestamp, transformTrend, transformTweet };
