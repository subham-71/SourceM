const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const {getAuth} = require('firebase-admin/auth');
const {getStorage} = require('firebase-admin/storage');


var admin = require("firebase-admin");
var serviceAccount = require("../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sourcem-8e7e3.appspot.com'
});

const firestore = getFirestore();
const bucket = getStorage().bucket();

module.exports = {firestore, bucket};