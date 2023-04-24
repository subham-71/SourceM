//'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const execTime = require('./routes/execution-time');
const exceptionThrow = require('./routes/exception-throw');
const pathCount = require('./routes/path-counter');
const functionCycle = require('./routes/funcn-cycle');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/exec-time', execTime.routes);
app.use('/exception-throw', exceptionThrow.routes);
app.use('/path-counter', pathCount.routes);
app.use('/function-cycle', functionCycle.routes);

app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));
