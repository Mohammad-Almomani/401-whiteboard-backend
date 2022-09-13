"use strict";

const supertest = require("supertest");
const server = require("../server");
const request = supertest(server.app);
let id;

describe("Verify server is running", () => {
  it("test home rout, should respond with 200 status code", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("test wrong rout, should respond with 404 status code", async () => {
    const response = await request.get("/notARout");
    expect(response.status).toBe(404);
  });
});

describe("Verify post post routs", () => {
  it("test create post, should respond with 201 status code", async () => {
    const response = await request.post("/post").send({
      title: "test title from create post",
      content: "test content",
    });
    expect(response.status).toBe(201);
    id = response._body.id;
  });

  it("test update post, should respond with 202 status code", async () => {
    console.log(id);
    const response = await request.put(`/post/${id}`).send({
      title: "new title from update post put",
      content: "new content",
    });
    expect(response.status).toBe(202);
  });

  it("test update post, should respond with 500 status code", async () => {
    const response = await request.put("/post/notExisting").send({
      title: "test title",
      content: "test content",
    });
    expect(response.status).toBe(500);
  });
});

describe("Verify post get routs", () => {
  it("test get all posts, should respond with 200 status code", async () => {
    const response = await request.get("/post");
    expect(response.status).toBe(200);
  });

  it("test get one post, should respond with 200 status code", async () => {
    const response = await request.get(`/post/${id}`);
    expect(response.status).toBe(200);
  });

  it("test get one post, should respond with 500 status code", async () => {
    const response = await request.get("/post/notExisting");
    expect(response.status).toBe(500);
  });
});

describe("Verify post delete routs", () => {
  it("test delete post, should respond with 204 status code", async () => {
    const response = await request.delete(`/post/${id}`);
    expect(response.status).toBe(204);
  });

  it("test delete post, should respond with 500 status code", async () => {
    const response = await request.delete("/post/0");
    expect(response.status).toBe(500);
  });
});
