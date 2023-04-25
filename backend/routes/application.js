const express = require('express');
const {getClientApplications,
       applicationRegister,
       applicationUpload
    } = require('../controllers/applicationController');

const router = express.Router();

router.post('/upload', applicationUpload);
router.post('/register', applicationRegister);
router.post('/get-client-app', getClientApplications);

module.exports = {
    routes: router
}