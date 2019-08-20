const express = require('express');
const router = new express.Router();
const Note = require('../models/note');

router.post('/api/notes', async (req, res) => {
	const note = new Note(req.body);

	try {
		await note.save();
		res.send(note);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/api/notes', async (req, res) => {
	try {
		const notes = await Note.find({});
		res.send(notes);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
