'use strict';

const firebase = require('../db');
// const Function = require('../models/function');
const firestore = firebase.firestore();


const addPathCounter = async (req) => {
        const {data} = req.body;
        for (let i = 0; i < data.length; i++) {
                
                if (await firestore.collection('Application').doc('appId').collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).get().data().empty) {
                        await firestore.collection('clientId').doc('applicationId').collection('Path Count').doc().set(data[i]);
                }
                else {
                        await firestore.collection('Application').doc('appId').collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).update({
                                'callCount': firebase.firestore.FieldValue.increment(data[i]["callCount"])
                        });
                }
        }
}

const getAllPathCounters = async (req, res) => {
        await firestore.collection('Application').doc('appId').collection('Path Count').get().data().forEach(doc => {
                res.send(doc.data());
        });
}