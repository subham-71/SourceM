'use strict';

const { firestore, bucket } = require('../db');
const fs = require("fs");
const Application = require('../models/application');
const { FieldValue } = require('firebase-admin/firestore');


const applicationUpload = async (req, res) => {
    try {

        // writing the JSON string content to a file
        const clientId = req.body.clientId;
        const appId = req.body.appId;

        var mssg = "appId=" + appId;
        await fs.writeFile("../backend/config_data/config.properties", mssg, (error) => {

            if (error) {
                // logging the error
                console.error(error);

                throw error;
            }
            console.log("data.json written correctly")
        })


        try {
            const file = bucket.file(`applications/${clientId}/${appId}/input.jar`);
            const fs = require('fs');

            const localFilePath = '../backend/config_data/input.jar';

            await file.download({ destination: localFilePath })
                .then(() => {
                    console.log('File downloaded successfully.');
                })
                .catch((error) => {
                    console.error('Error downloading file:', error);
                });
        }

        catch (error) {
            console.log(error)
        }

        // run bash script

        function execShellCommand(cmd) {
        const exec = require('child_process').exec;
        return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
        }
            resolve(stdout? stdout : stderr);
            });
        });
        }

        const scriptPath = '../backend/aspect-weave.sh';
        const runinfo = await execShellCommand(`bash ${scriptPath}`);
        console.log(runinfo);
        

        // download output.zip

        const localFilePathUpload = '../backend/output.zip';

        const remoteFilePath = `applications/${clientId}/${appId}/output.zip`;

        await bucket.upload(localFilePathUpload, { destination: remoteFilePath })
            .then(() => {
                console.log('File uploaded successfully.');
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });



        res.status(200);
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const applicationRegister = async (req, res) => {
    console.log(req.body)
    const clientId = req.body.clientId;
    const appName = req.body.appName;
    const appStatus = req.body.appStatus
    let appId = "";
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
        res.status(200).send(appId);
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
        application.forEach((doc) => {
            const id = doc.id
            const docData = doc.data()
            applicationMap[id] = { "Name": docData.Name, "Status": docData.Status }
        });
        if (data.exists) {
            const appData = data.data()["Application"];
            const appFilterData = []
            appData.forEach((id) => {
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
const changeStatus = async (req, res) => {
    try {
        const appId = req.body.appId;

        await firestore.collection("Application").doc(appId).update({ "Status": "Deployed" })
        res.status(200).send("Status Changed");


    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    applicationUpload,
    applicationRegister,
    getClientApplications,
    changeStatus
}
