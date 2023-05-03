const request = require("supertest");
const app = require("../index");

const appId = "appId2";
const id = "int org.example.Main.testThrow(int, int)" // have to add a new id field (separate from function name)

test("all-func-exec", async () => {

	const data = {
		appId: appId,
	}
    
    const response = await request(app).post("/exec-time/all-func-exec").send(data)
    expect(response.statusCode).toBe(200)
		
})

test("func-exec", async () => {

	const data = {
		appId: appId,
		id: id
	}
})

// test("func-exec", async () => {
    
//     const response = await request(app).get("/exec-time/func-exec/").query({ id: id })
//     expect(response.statusCode).toBe(200)
		
// })
