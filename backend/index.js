//'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const execTime = require('./routes/execution-time');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/exec-time', execTime.routes);

app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));
