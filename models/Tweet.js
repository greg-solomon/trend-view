const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	created_at: {
		type: Date,
		required: true,
	},
	text: {
		type: String,
	},
	media_url: {
		type: String,
		required: true,
	},
	trends: [
		{
			type: Schema.Types.ObjectId,
			ref: "Trend",
		},
	],
	user: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	user_display_pic: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	retweet_count: {
		type: Number,
		required: true,
	},
	favorite_count: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Tweet", tweetSchema);
