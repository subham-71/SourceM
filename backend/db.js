const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const {getAuth} = require('firebase-admin/auth');


var admin = require("firebase-admin");
var serviceAccount = require("./sourcem-8e7e3-firebase-adminsdk-lbj4r-b10104ba23.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

module.exports = db;