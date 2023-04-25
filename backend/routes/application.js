const express = require('express');
const {getClientApplications,
       applicationRegister
    } = require('../controllers/applicationController');

const router = express.Router();

router.post('/register', applicationRegister);
router.post('/get-client-app', getClientApplications);

module.exports = {
    routes: router
}