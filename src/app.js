const express = require('express');
const app = express();
require('./db/mongoose');
const notesRouter = require('./routes/notes');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(notesRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
