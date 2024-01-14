import { Entry } from "@prisma/client";
import { server } from "../src/server";

// An entry to be used in the tests with payloads
const entryId = "test";
const randomEntry: Entry = {
  id: entryId,
  title: "Random",
  description: "Entry",
  created_at: new Date(),
  scheduled_for: new Date(),
};

describe("Testing jest", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

test("GET /get/ should return a list of items", async () => {
  const response = await server.inject({
    method: "GET",
    url: "/get/",
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeInstanceOf(Array);
});

test("GET /get/:id should return 500 if the specified item id is not found", async () => {
  const response = await server.inject({
    method: "GET",
    url: "/get/non-existent",
  });

  expect(response.statusCode).toBe(500); // NOTE: this is not using the normal 404 status code in the server app
});

test("POST /create should return a created Entry", async () => {
  const response = await server.inject({
    method: "POST",
    url: "/create/",
    payload: randomEntry,
  });

  expect(response.statusCode).toBe(200);
  expect(response.json().id).toBe("test");
});

test("POST /create with invalid Entry should return error", async () => {
  const response = await server.inject({
    method: "POST",
    url: "/create/",
    payload: {},
  });

  expect(response.statusCode).toBe(500);
});

test("GET /get/test should get the Random Entry",async () => {
  const response = await server.inject({
    method: "GET",
    url: "/get/test",
  });

  expect(response.json().title).toBe("Random");
})

test("PUT /update/:id should change the 'test' entry title", async () => {
  const updatedEntry = { ...randomEntry, title: "Intentional" };

  const response = await server.inject({
    method: "PUT",
    url: "/update/" + entryId,
    payload: updatedEntry,
  });

  const contentTest = await server.inject({
    method: "GET",
    url: "/get/" + entryId,
  });

  expect(response.statusCode).toBe(200);
  expect(contentTest.json().title).toBe("Intentional");
});

test("PUT /update/non-existent should return error code 500", async () => {
  const response = await server.inject({
    method: "PUT",
    url: "/update/non-existent",
    payload: randomEntry,
  });

  expect(response.statusCode).toBe(500);
});

test("DELETE /delete/:id should delete the entry generated above with the id = 'test'", async () => {
  const response = await server.inject({
    method: "DELETE",
    url: "/delete/" + entryId,
  });

  expect(response.statusCode).toBe(200);
});

test("DELETE /delete/non-existent should return error code 500", async () => {
  const response = await server.inject({
    method: "DELETE",
    url: "/delete/non-existent",
  });

  expect(response.statusCode).toBe(500);
});