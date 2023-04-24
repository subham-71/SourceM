'use strict';

const firestore = require('../db');


const addPathCounter = async (req) => {
        const data = req.body.data;
        const appId = req.body.appId;
        for (let i = 0; i < data.length; i++) {
                if (await firestore.collection('Application').doc(appId).collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).get()) {
                        await firestore.collection('Application').doc(appId).collection('Path Count').doc().set(data[i]);
                }
                else {
                        await firestore.collection('Application').doc(appId).collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).update({
                                'callCount': firebase.firestore.FieldValue.increment(data[i]["callCount"])
                        });
                }
        }
}

const getAllPathCounters = async (req, res) => {
        const appId = req.body.appId;
        const data = await firestore.collection('Application').doc(appId).collection('Path Count').get();
        if (!data.exists) {
                res.status(404).send('No record found');
        } else { 
                data().data().forEach(doc => {
                        res.send(doc.data());
                });
        }
}

module.exports = {
        addPathCounter,
        getAllPathCounters
    }