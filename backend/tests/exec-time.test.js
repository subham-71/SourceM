const request = require("supertest");
// server = require("../index");
app = require("../index-test")
server = app.listen(8000, () => console.log('App is listening on url http://localhost:' + 8000));

const appId = "appId2";
const id = "int org.example.Main.testThrow(int, int)" // have to add a new id field (separate from function name)

// beforeAll(() => {
// 	server = app.listen(someRandomNumberHere); // Random number is needed to avoid using same port in different tests if you run in parallel
//      })
     
//      afterAll(() => {
// 	server.close()
//      })
     

test("all-func-exec-1", async () => {

	const data = {
		appId: appId,
	}
    
    const response = await request(server).post("/exec-time/all-func-exec").send(data)
    expect(response.statusCode).toBe(200)
		
})

test("all-func-exec-2", async () => {

	const data = {
		appId: "appId-invalid",
	}
    
    const response = await request(server).post("/exec-time/all-func-exec").send(data)
    expect(response.statusCode).toBe(404)
		
})

test("func-exec-1", async () => {

	const data = {
		appId: appId,
		id: id
	}
	const response = await request(server).post("/exec-time/func-exec").send(data)
    	expect(response.statusCode).toBe(200)
})

test("func-exec-2", async () => {

	const data = {
		appId: "appId-invalid",
		id: id
	}
	const response = await request(server).post("/exec-time/func-exec").send(data)
    	expect(response.statusCode).toBe(404)
})

test ("add-func-exec", async () => {
	const data = {
		appId: appId,
		data: [{
			"functionName": "int org.example.Main.testThrow(int, int)",
			"executionCount": 1,
			"timeExecuted": 100
		}]
	}
	const response = await request(server).post("/exec-time/add-func-exec").send(data)
	expect(response.statusCode).toBe(200)
})


server.close()