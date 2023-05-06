'use strict';

const {firestore,storage} = require('../db');
const { FieldValue } = require('firebase-admin/firestore');


const addPathCounter = async (req, res) => {
    const data = req.body.data;
    const appId = req.body.appId;

    for (let i = 0; i < data.length; i++) {
        const check = await firestore.collection('Application').doc(appId).collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).get()
        if (check.docs.length == 0) {
            await firestore.collection('Application').doc(appId).collection('Path Count').doc().set(data[i]);
        }
        else {
            let newData;
            let newId;
            const docs = await firestore.collection('Application').doc(appId).collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).get();
            docs.forEach(doc => {
                newData = doc.data();
                newData["callCount"] = newData["callCount"] + data[i]["callCount"];
                newId = doc.id;
            });
            await firestore.collection('Application').doc(appId).collection('Path Count').doc(newId).set(newData);


            // await firestore.collection('Application').doc(appId).collection('Path Count').where("caller", "==", data[i]["caller"]).where("callee", "==", data[i]["callee"]).update({
            //     'callCount': FieldValue.increment(data[i]["callCount"])
            // });
        }
    }
    res.status(200).send('Record saved successfuly');
}

const getAllPathCounters = async (req, res) => {
    const appId = req.body.appId;
    const data = await firestore.collection('Application').doc(appId).collection('Path Count').get();
    let pathCount = []

    data.forEach(doc => {
        pathCount.push(doc.data())
        
    });
    if (pathCount.length == 0) {
        res.status(400).send("No records found")
    }
    else {
        res.status(200).send(pathCount);
    }
}

module.exports = {
    addPathCounter,
    getAllPathCounters
}
