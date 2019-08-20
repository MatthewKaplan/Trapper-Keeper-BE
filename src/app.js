const express = require('express');
require('./db/mongoose');
const app = express();
const cors = require('cors')
const notesRouter = require('./routes/notes');


app.use(cors());
app.use(express.json());
app.use(notesRouter);

module.exports = app;
