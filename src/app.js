const express = require('express');
require('./db/mongoose');
const app = express();
const notesRouter = require('./routes/notes');

app.use(express.json());
app.use(notesRouter);

module.exports = app;
