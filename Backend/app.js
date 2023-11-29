const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Placeholder for in-memory data store
let users = [];
let stories = [];
let mentors = [];
let discussions = [];

// Routes will go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
