'use strict';

const firestore = require('../db');
const Exception = require('../models/exception');

const addFunctionException = async (req) => {
    try {
        const data = req.body.data;
        const appId = req.body.appId;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]["timestamps"].length; j++) {
                await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]['functionName']).collection('Exception').doc(data[i]['exceptionClass']).update({
                    'timestamps': firebase.firestore.FieldValue.arrayUnion(data[i]["timestamps"][j])
                });
            }
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFunctionException = async (rec, res) => {
    try {
        const id = req.body.functionId;
        const appId = req.body.appId;
        const exceptionArray = [];
        const data = await firestore.collection('Application').doc(appId).collection('Function').doc(id).collection('Exception').get();
        if (!data.exists) {
            res.status(404).send('No record found');
        } else {
            data.forEach(doc => {
                const excptn = new Exception(
                    id, 
                    doc.id,
                    doc.data()["timestamp"]
                );
                exceptionArray.push(excptn);
            });
            
            res.send(exceptionArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFunctionException = async (rec, res) => {
    try {
        const id = req.body.functionId;
        const exceptionId = req.body.exceptionId;
        const appId = req.body.appId;
        const data = await firestore.collection('Application').doc(appId).collection('Function').doc(id).collection('Exception').doc(exceptionId).get();
        if (!data.exists) {
            res.status(404).send('No record found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addFunctionException,
    getAllFunctionException,
    getFunctionException
}