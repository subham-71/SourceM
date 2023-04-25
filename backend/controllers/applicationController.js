'use strict';

const firestore = require('../db');

const applicationRegister = async(req,res) => {
        const clientId = req.body.clientId;

        
}

const getClientApplications = async (req, res) => {
        try {
                const clientId = req.body.clientId;
                const data = await firestore.collection("Client").doc(clientId).get();
                const application = await firestore.collection("Application").get();
                const applicationMap = {}
                application.forEach((doc)=>{
                        const docData = doc.data()
                        application[doc.id] = {"Name":docData.name,"Status":docData.status}
                })
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
