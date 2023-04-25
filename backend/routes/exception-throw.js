const express = require('express');
const {addFunctionException,
        getAllFunctionException,
        getFunctionException,
        getAllFunctionAllException
    } = require('../controllers/exceptionThrowController');

const router = express.Router();

router.post('/add-func-exception', addFunctionException);
router.post('/all-func-exception', getAllFunctionException);
router.post('/func-exec', getFunctionException);
router.post('/all-func-all-exec', getAllFunctionAllException);

module.exports = {
    routes: router
}
