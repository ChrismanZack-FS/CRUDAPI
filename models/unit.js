const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	faction: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Unit", unitSchema);
