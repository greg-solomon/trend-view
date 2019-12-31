// Define twitter functions for storing data.
import { Twitter } from "twitter-node-client";
import Trend from "../../../models/Trend";
import Tweet from "../../../models/Tweet";
const twitter = new Twitter({
	consumerKey: process.env.CONSUMER_KEY,
	consumerSecret: process.env.CONSUMER_SECRET,
	accessToken: process.env.ACCESS_TOKEN,
	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function storeTrends(timestamp) {
	// Callbacks
	const error = e => console.error(e);
	const success = async response => {
		// response comes back a string
		const data = JSON.parse(response)[0];
		const { trends, as_of, created_at } = data;

		trends.map(trend => {
			trend.as_of = as_of;
			trend.created_at = created_at;
		});

		// Prepare mongoose models
		const promises = [];

		trends.forEach(async trend => {
			// check if trend exists
			const _trend = await Trend.findOne({ url: trend.url });
			if (_trend) {
				// update trend's created_at and as_of
				_trend.created_at = trend.created_at;
				_trend.as_of = trend.as_of;
				_trend.timestamps.push(timestamp.id);
				promises.push(_trend.save());
			} else {
				const promise = new Trend({
					name: trend.name,
					url: trend.url,
					query: trend.query,
					tweet_volume: trend.tweet_volume,
					as_of: trend.as_of,
					created_at: trend.created_at,
					tweets: [],
					timestamps: [timestamp.id],
				});
				promises.push(promise.save());
			}
		});
		promises.push(timestamp.save());
		await Promise.resolve(promises);
		return Trend.find({ tweets: [] });
	};

	try {
		// API call
		twitter.getCustomApiCall("/trends/place.json", { id: 23424977 }, error, success);
	} catch (error) {
		console.error(error);
	}
}

async function storeTweets(trend) {
	try {
		// Callbacks
		const error = e => console.error(e);
		const success = async response => {
			const data = JSON.parse(response);
			const { statuses } = data;
			const tweets = statuses.filter(tweet => typeof tweet.entities.media !== "undefined");

			const promises = [];

			tweets.forEach(tweet => {
				console.log(tweet.user.url);
				const tweetToPush = new Tweet({
					created_at: tweet.created_at,
					text: tweet.text,
					media_url: tweet.entities.media[0].media_url,
					url: tweet.entities.media[0].url,
					trends: [trend.id],
					user_display_pic: tweet.user.profile_image_url,
					user: tweet.user.screen_name,
					name: tweet.user.name,
					retweet_count: tweet.retweet_count,
					favorite_count: tweet.favorite_count,
				});
				trend.tweets.push(tweetToPush.id);
				promises.push(tweetToPush.save());
			});

			promises.push(trend.save());
			return await Promise.resolve(promises);
		};
		// Set parameters
		const params = {
			q: trend.query,
			filter: "images",
			result_type: "popular",
			include_entities: "true",
		};
		// API Call
		twitter.getSearch(params, error, success);
		return;
	} catch (error) {
		console.error(error);
	}
}

export { storeTrends, storeTweets };
