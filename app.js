const express = require('express');
const formRoutes = require('./routes/formRoutes');
const app = express();

app.use(express.json());
app.use('/api', formRoutes);

module.exports = app;
