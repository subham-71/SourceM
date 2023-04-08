'use strict';

const firebase = require('../db');
const Function = require('../models/function');
const firestore = firebase.firestore();


const addFunctionExecutionTime = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('functions').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFunctionExecutionTimes = async (req, res, next) => {
    try {
        const functions = await firestore.collection('functions');
        const data = await functions.get();
        const functionArray = [];
        if(data.empty) {
            res.status(404).send('No record found');
        }else {
            data.forEach(doc => {
                const func = new Function(
                    doc.id,
                    doc.data().functionName,
                    doc.data().status
                );
                functionArray.push(func);
            });
            res.send(functionArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFunctionExecutionTime = async (req, res, next) => {
    try {
        const id = req.params.id;
        const func = await firestore.collection('functions').doc(id);
        const data = await func.get();
        if(!data.exists) {
            res.status(404).send('Function with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateFunctionExecutionTime = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const func =  await firestore.collection('functions').doc(id);
        await func.update(data);
        res.send('Record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteFunctionExecutionTime = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('functions').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addFunctionExecutionTime,
    getAllFunctionExecutionTimes,
    getFunctionExecutionTime,
    updateFunctionExecutionTime,
    deleteFunctionExecutionTime
}