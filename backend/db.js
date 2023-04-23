const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


var admin = require("firebase-admin");
var serviceAccount = require("./sourcem-8e7e3-firebase-adminsdk-lbj4r-b10104ba23.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;