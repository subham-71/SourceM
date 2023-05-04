'use strict';

const {firestore,storage} = require('../db');
const Profile = require('../models/profile');

const addFunctionCycle = async (req, res, next) => {
        const data = req.body.data;
        const appId = req.body.appId;
        try {
                for (let i = 0; i < data.length; i++) {
                        await firestore.collection('Application').doc(appId).collection('Profiler').doc().set(data[i]);
                }
                res.status(200).send('Record saved successfully');
        } catch (error) { 
                res.status(400).send("Error in adding function cycle");
        }
}

const getFunctionCycle = async (req, res) => {
        const appId = req.body.appId;
        try {
                const funcCycle = await firestore.collection('Application').doc(appId).collection('Profiler').get();
                const profileArray = [];
                funcCycle.forEach(doc => {
                        const profile = new Profile(
                                doc.data()["parent"],
                                doc.data()["parent_id"],
                                doc.data()["call_id"],
                                doc.data()["name"],
                                doc.data()["depth"],
                                doc.data()["start_time"],
                                doc.data()["end_time"],
                        )
                        profileArray.push(profile);
                });
                res.status(200).send(profileArray);
        } catch (error) {
                res.status(400).send("Error in fetching function cycle");
        }
}

module.exports = {
        addFunctionCycle,
        getFunctionCycle
}