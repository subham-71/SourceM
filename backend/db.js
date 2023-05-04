const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const {getAuth} = require('firebase-admin/auth');


var admin = require("firebase-admin");
var serviceAccount = require("../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

module.exports = db;