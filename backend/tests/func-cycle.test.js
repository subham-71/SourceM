const request = require("supertest");
// server = require("../index");
app = require("../index-test")
server = app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));

const appId = "appId2";
const id = "int org.example.Main.testThrow(int, int)"

test("add-func-cycle", async () => {
        const data = {
                appId: appId,
                data: {
                        "parent": "void org.example.Main.main(String[])",
                        "parent_id": 0,
                        "call_id": 1,
                        "name": "int org.example.Main.testThrow(int, int)",
                        "depth": 1,
                        "start_time": 28060580928900,
                        "end_time": 28060596534800
                }
        }
        const response = await request(server).post("/funcn-cycle/add-func-cycle").send(data)
        expect(response.statusCode).toBe(200)
})

test ("get-func-cycle", async () => {
        const data = {
                appId: appId,
        }

        const response = await request(server).post("/funcn-cycle/get-func-cycle").send(data)
        expect(response.statusCode).toBe(200)
})

server.close()
