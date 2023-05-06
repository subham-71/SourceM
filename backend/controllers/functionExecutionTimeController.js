'use strict';

const {firestore,storage} = require('../db');
const Function = require('../models/function');


const addFunctionExecutionTime = async (req, res, next) => {
    try {
        const data = req.body.data;
        const appId = req.body.appId;

        for (let i = 0; i < data.length; i++) {
            const functStat = await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]["functionName"]).get();
            if (functStat.exists) {
                let count = functStat.data()["executionCount"];
                let avg = functStat.data()["timeExecuted"];
                count += data[i]["executionCount"];
                avg += data[i]["timeExecuted"];
                await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]["functionName"]).set({
                    "executionCount": count,
                    "timeExecuted": avg
                });
            }
            else {
                await firestore.collection('Application').doc(appId).collection('Function').doc(data[i]["functionName"]).set({
                    "executionCount": data[i]["executionCount"],
                    "timeExecuted": data[i]["timeExecuted"]
                });
            }
        }

        res.status(200).send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFunctionExecutionTimes = async (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    try {
        const appId = req.body.appId;
        const data = await firestore.collection('Application').doc(appId).collection('Function').get();
        const functionArray = [];
        if(data.empty) {
            res.status(404).send('No record found');
        } else {
            data.forEach(doc => {
                const func = new Function(
                    doc.id, // function name
                    doc.data()["executionCount"],
                    doc.data()["timeExecuted"]
                );
                functionArray.push(func);
            });
            res.status(200).send(functionArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFunctionExecutionTime = async (req, res, next) => {
    try {
        const appId = req.body.appId;
        const id = req.body.id;
        const func = await firestore.collection('Application').doc(appId).collection('Function').doc(id);
        const data = await func.get();
        if(!data.exists) {
            res.status(404).send('Function with the given ID not found');
        }else {
            res.status(200).send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// const deleteFunctionExecutionTime = async (req, res, next) => {
//     try {
//         const appId = req.body.appId;
//         const id = req.params.id;
//         await firestore.collection("Application").doc(appId).collection('Function').doc(id).delete();
//         res.send('Record deleted successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    addFunctionExecutionTime,
    getAllFunctionExecutionTimes,
    getFunctionExecutionTime,
    // updateFunctionExecutionTime,
    // deleteFunctionExecutionTime
}