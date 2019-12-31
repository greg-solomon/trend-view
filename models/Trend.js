const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trendSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	promoted_content: {
		type: Boolean,
	},
	query: {
		type: String,
		required: true,
	},
	tweet_volume: {
		type: Number,
	},
	as_of: {
		type: Date,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
	},
	tweets: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tweet",
		},
	],
	timestamps: [
		{
			type: Schema.Types.ObjectId,
			ref: "Timestamp",
		},
	],
});

module.exports = mongoose.model("Trend", trendSchema);
