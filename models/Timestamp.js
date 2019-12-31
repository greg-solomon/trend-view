const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tsSchema = new Schema({
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Timestamp", tsSchema);
