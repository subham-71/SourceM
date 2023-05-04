const request = require("supertest");
// server = require("../index");
app = require("../index-test")
server = app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));

const appId = "appId2";
const id = "int org.example.Main.testThrow(int, int)" // have to add a new id field (separate from function name)
const exceptionId = "java.lang.ArithmeticException"

test ("add-func-exception", async () => {
        const data = {
                appId: appId,
                data: {
                        "functionName": id,
                        "exceptionName": exceptionId,
                        "exceptionCount": 1
                }
        }
        const response = await request(server).post("/exception-throw/add-func-exception").send(data)
        expect(response.statusCode).toBe(200)
})

test ("all-func-all-exception", async () => {
        const data = {
                appId: appId,
                
        }

        const response = await request(server).post("/exception-throw/all-func-all-exception").send(data)
        expect(response.statusCode).toBe(200)

}) 

test ("all-func-exception", async () => {
        const data = {
                appId: appId,
                functionId: id
        }

        const response = await request(server).post("/exception-throw/all-func-exception").send(data)
        // console.log(response.statusCode)
        expect(response.statusCode).toBe(200)
})

test ("func-exception-1", async () =>{
        const data = {
                appId: appId,
                functionId: id,
                exceptionId: exceptionId
        }

        const response = await request(server).post("/exception-throw/func-exception").send(data)
        expect(response.statusCode).toBe(200)
})

test ("func-exception-2", async () =>{
        const data = {
                appId: "appId-inv",
                functionId: id,
                exceptionId: exceptionId
        }

        const response = await request(server).post("/exception-throw/func-exception").send(data)
        expect(response.statusCode).toBe(404)
})

server.close()

