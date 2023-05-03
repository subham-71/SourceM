const express = require('express');
const {addFunctionExecutionTime, 
       getAllFunctionExecutionTimes, 
       getFunctionExecutionTime,
    //    updateFunctionExecutionTime,
    //    deleteFunctionExecutionTime
    } = require('../controllers/functionExecutionTimeController');

const router = express.Router();

router.post('/add-func-exec', addFunctionExecutionTime);
router.post('/all-func-exec', getAllFunctionExecutionTimes);
router.post('/func-exec/', getFunctionExecutionTime);
// router.put('/func-exec/:id', updateFunctionExecutionTime);
// router.delete('/func-exec/', deleteFunctionExecutionTime);


module.exports = {
    routes: router
}
