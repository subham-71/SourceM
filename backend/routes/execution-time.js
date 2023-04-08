const express = require('express');
const {addFunctionExecutionTime, 
       getAllFunctionExecutionTimes, 
       getFunctionExecutionTime,
       updateFunctionExecutionTime,
       deleteFunctionExecutionTime
    } = require('../controllers/functionExecutionTimeController');

const router = express.Router();

router.post('/add-func-exec', addFunctionExecutionTime);
router.get('/all-func-exec', getAllFunctionExecutionTimes);
router.get('/func-exec/:id', getFunctionExecutionTime);
router.put('/func-exec/:id', updateFunctionExecutionTime);
router.delete('/func-exec/:id', deleteFunctionExecutionTime);


module.exports = {
    routes: router
}
