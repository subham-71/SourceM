const {initializeApp} = require('firebase-admin/app');
const config = require('./config');

const db = initializeApp(config.firebaseConfig);

module.exports = db;