const {firestore,storage} = require('../db');

const request = require("supertest");

app = require("../index-test")
server = app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));

const id = "euv3eXvV6kXSFspxH6dgEG6P85g2"

test ("register", async () => {
        const data = {
                clientId: id,
                appName: "test app",
                appStatus: "Deployed"
        }
        const response = await request(server).post("/application/register").send(data)
        expect(response.statusCode).toBe(200)

        
})

test ("get-client-app", async () => {
        const data = {
                clientId: id,
        }

        const response = await request(server).post("/application/get-client-app").send(data)
        expect(response.statusCode).toBe(200)
})

server.close()
