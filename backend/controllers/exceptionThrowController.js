'use strict';

const {firestore,storage} = require('../db');
const Exception = require('../models/exception');
const { FieldValue } = require('firebase-admin/firestore');

const addFunctionException = async (req, res) => {
    try {
        const data = req.body.data;
        const appId = req.body.appId;
        for (let i = 0; i < data.length; i++) {
            const check = await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]['functionName']).collection('Exception').doc(data[i]['exceptionClass']).get();
            if (!check.exists) {
                await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]['functionName']).collection('Exception').doc(data[i]['exceptionClass']).set({
                    'timestamps': data[i]["timestamps"]
                });
                continue;
            }
            // await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]['functionName']).collection('Exception').doc(data[i]['exceptionClass']).update({
            //     'timestamps': firestore.FieldValue.arrayUnion(data[i]["timestamps"])
            // });
            for (let j = 0; j < data[i]["timestamps"].length; j++) {
                await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]['functionName']).collection('Exception').doc(data[i]['exceptionClass']).update({
                    'timestamps': FieldValue.arrayUnion(data[i]["timestamps"][j])
                });
            }
        }
        res.status(200).send('Record saved successfuly');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFunctionException = async (req, res) => {
    try {
        const appId = req.body.appId;
        const id = req.body.functionId;
        const exceptionArray = [];
        const data = await firestore.collection('Application').doc(appId).collection('Function').doc(id).collection('Exception').get();
        
        data.forEach(doc => {
            const excptn = new Exception(
                id,
                doc.id,
                doc.data()["timestamps"]
            );
            exceptionArray.push(excptn);
        });
        res.status(200).send(exceptionArray);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFunctionException = async (req, res) => {
    try {
        const id = req.body.functionId;
        const exceptionId = req.body.exceptionId;
        const appId = req.body.appId;
        const data = await firestore.collection('Application').doc(appId).collection('Function').doc(id).collection('Exception').doc(exceptionId).get();
        if (!data.exists) {
            res.status(404).send('No record found');
        } else {
            res.status(200).send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFunctionAllException = async (req, res) => {
    try {
        const appId = req.body.appId;
        const exceptionArray = [];
        const data = await firestore.collection('Application').doc(appId).collection('Function').get();

        for (let doc of data.docs) {
  
            const dataEx =  await firestore.collection('Application').doc(appId).collection('Function').doc(doc.id).collection('Exception').get();
            dataEx.forEach(doc1 => {
                const excptn = new Exception(
                    doc.id,
                    doc1.id,
                    doc1.data()["timestamps"]
                );
                exceptionArray.push(excptn);
            });
        };
        res.status(200).send(exceptionArray)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    addFunctionException,
    getAllFunctionException,
    getFunctionException,
    getAllFunctionAllException
}