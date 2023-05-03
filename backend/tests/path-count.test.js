const request = require("supertest");
// server = require("../index");
app = require("../index-test")
server = app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));

const appId = "appId2";
const id = "int org.example.Main.testThrow(int, int)"

test("add-path-counter-1", async () => {
        const data = {
                appId: appId,
                data: {
                        "caller": "main",
                        "callee": "testThrow",
                        "callCount": 1
                      }          
        }
        const response = await request(server).post("/path-counter/add-path-counter").send(data)
        expect(response.statusCode).toBe(200)
})

test("add-path-counter-2", async () => {
        const data = {
                appId: appId,
                data: {
                        "caller": "void org.example.Main.main(String[])",
                        "callee": "int org.example.Main.testThrow(int, int)",
                        "callCount": 1
                      }          
        }
        const response = await request(server).post("/path-counter/add-path-counter").send(data)
        expect(response.statusCode).toBe(200)
})

test("all-path-counters", async () => {
        const data = {
                appId: appId,
        }

        const response = await request(server).post("/path-counter/all-path-counters").send(data)
        expect(response.statusCode).toBe(200)
})

test("all-path-counters-invalid", async () => {
        const data = {
                appId: "appId-invalid",
        }

        const response = await request(server).post("/path-counter/all-path-counters").send(data)
        expect(response.statusCode).toBe(400)
})

server.close()
