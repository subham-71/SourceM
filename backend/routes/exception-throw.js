const express = require('express');
const {addFunctionException,
        getFunctionException
    } = require('../controllers/exceptionThrowController');

const router = express.Router();

// router.post('/add-func-exception', addFunctionException);
// router.get('/all-func-exception', getFunctionException);


module.exports = {
    routes: router
}
