const express = require('express');
const {addFunctionException,
         getAllFunctionException,
        getFunctionException
    } = require('../controllers/exceptionThrowController');

const router = express.Router();

router.post('/add-func-exception', addFunctionException);
router.get('/all-func-exception/:id', getAllFunctionException);
router.get('/func-exec/:id', getFunctionException);

module.exports = {
    routes: router
}
