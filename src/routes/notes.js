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

router.get('/api/notes/:id', async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).send({ error: 'Unable to locate note with given ID' });
		}
		res.send(note);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.patch('/api/notes/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'title', 'notes' ];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(404).send({ error: 'Invalided updates!' });
	}
	try {
    const note = await Note.findOne({ _id: req.params.id });
    
    if(!note) {
      return res.status(404).send({ error: 'Unable to locate note with given ID'})
    }

    updates.forEach(update => (note[update] = req.body[update]));
    await note.save();
    res.send(note);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.delete('/api/notes/:id', async (req, res) => {
	try {
		const note = await Note.findByIdAndDelete(req.params.id);

		if (!note) {
			return res.status(404).send({ error: 'Unable to locate note with given ID' });
		}

		res.send(note);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
