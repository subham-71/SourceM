const express = require('express');
const {
        addFunctionCycle,
        getFunctionCycle
    } = require('../controllers/functionCycleController');

const router = express.Router();

router.post('/add-func-cycle', addFunctionCycle);
router.post('/get-func-cycle', getFunctionCycle);

module.exports = {
    routes: router
}
