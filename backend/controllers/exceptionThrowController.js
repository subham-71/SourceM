'use strict';

const firestore = require('../db');
const Function = require('../models/function');

const addFunctionException = async (req) => {
        try {
                const {data} = req.body;
                for (let i = 0; i < data.length; i++) {
                        for(let j = 0; j < data[i]["timestamps"].length; j++) {
                                await firestore.collection('Application').doc('appId').collection('Function').doc(data[i]['functionName']).collection('Exception').doc(data[i]['exceptionClass']).update({
                                        'timestamps': firebase.firestore.FieldValue.arrayUnion(data[i]["timestamps"][j])
                                });
                        }
                }
                
        } 
        catch (error) {
                res.status(400).send(error.message);
        }
}

const getFunctionException = async(rec, res) => {
        try {
                const id = req.params.id;
                const data = await firestore.collection('Application').doc('appId').collection('Function').doc(id).collection('Exception').doc('exceptionClass').get();
                if(!data.exists) {
                        res.status(404).send('No record found');
                } else {
                        res.send(data.data());
                }
        } catch (error) {
                res.status(400).send(error.message);
        }
}

