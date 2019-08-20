const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	notes: [
		{
			message: {
				type: String,
				required: true,
				trim: true
			},
			completed: {
				type: Boolean
			}
		}
	]
});

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
