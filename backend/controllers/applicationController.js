'use strict';

const firestore = require('../db');
const Application = require('../models/application');

const applicationRegister = async(req,res) => {
        const clientId = req.body.clientId;
        const appName = req.body.appName;
        const appStatus = req.body.appStatus
        let appId;
        await firestore.collection('Application').add({
                'Name': appName,
                'Status': appStatus
        }).then((docRef) => {
                appId = docRef.id;
        }).catch(
                error => console.error("Error adding document: ", error)
        );

        const clientApp = await firestore.collection('Client').doc(clientId).get();
        if (clientApp.exists) {
                await firestore.collection('Client').doc(clientId).update({
                        'Application': FieldValue.arrayUnion(appId)
                });
        } else {
                res.status(400).send('Client ID Invalid');
        }
}

const getClientApplications = async (req, res) => {
        try {
                const clientId = req.body.clientId;
                const data = await firestore.collection("Client").doc(clientId).get();
                const application = await firestore.collection("Application").get()
                
                const applicationMap = {}
                application.forEach((doc)=>{
                        const docData = doc.data()
                        application[doc.id] = {"Name":docData.name, "Status":docData.status}
                });
                if (data.exists) {
                        const appData = data.data()["Application"];
                        const appFilterData = []
                        appData.forEach((id)=>{
                                const app = new Application(
                                        id,
                                        applicationMap[id]["Name"],
                                        applicationMap[id]["Status"]
                                );
                                appFilterData.push(app)
                        })
                        res.send(appFilterData);
                }
                else {
                        res.status(400).send("Client not found");
                }

        } 
        catch (error) {
                res.status(400).send(error.message);
        }
}

module.exports = {
        applicationRegister,
        getClientApplications
}
