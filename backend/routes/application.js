const express = require('express');
const {getClientApplications,
       applicationRegister,
       applicationUpload,
       changeStatus
    } = require('../controllers/applicationController');

const router = express.Router();

router.post('/upload', applicationUpload);
router.post('/register', applicationRegister);
router.post('/get-client-app', getClientApplications);
router.post('/change-status', changeStatus);

module.exports = {
    routes: router
}