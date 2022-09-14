"use strict";

const supertest = require("supertest");
const server = require("../server");
const request = supertest(server.app);
let id, commentID;

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

describe("Verify comment routs", () => {
  it("test create comment, should respond with 201 status code", async () => {
    const response = await request.post("/comment").send({
      comment: "test title from create comment",
      postID: id,
    });
    expect(response.status).toBe(201);
    commentID = response._body.id;
  });

  it("test create comment, should respond with 500 status code", async () => {
    const response = await request.post("/comment").send({
      comennnt: "test title from create comment",
      Author: 55,
      post: id,
    });
    expect(response.text).toEqual(
      /* eslint-disable-next-line quotes */
      '"Error while creating the data for model Comments"'
    );
  });

  it("test update comment, should respond with 202 status code", async () => {
    console.log(commentID);
    const response = await request.put(`/comment/${commentID}`).send({
      comment: "test title from create new comment",
      postID: id,
    });
    expect(response.status).toBe(202);
  });

  it("test update comment, should respond with 500 status code", async () => {
    const response = await request.put("/comment/notExisting").send({
      comment: "test title from create comment",
      postID: id,
    });
    expect(response.status).toBe(500);
  });
});

describe("Verify comment get routs", () => {
  it("test get all comment, should respond with 200 status code", async () => {
    const response = await request.get("/comment");
    expect(response.status).toBe(200);
  });

  it("test get one comment, should respond with 200 status code", async () => {
    const response = await request.get(`/comment/${commentID}`);
    expect(response.status).toBe(200);
  });

  it("test get one comment, should respond with 500 status code", async () => {
    const response = await request.get("/comment/notExisting");
    expect(response.status).toBe(500);
  });
});

describe("Verify get full post routs", () => {
  it("test get full post, should respond with 200 status code", async () => {
    const response = await request.get(`/fullPost`);
    expect(response.status).toBe(200);
  });
  it("test get one full post, should respond with 200 status code", async () => {
    const response = await request.get(`/fullPost/${commentID}`);
    expect(response.status).toBe(200);
  });
  it("test get one full post, should respond with 500 status code", async () => {
    const response = await request.get("/fullPost/notExisting");
    expect(response.status).toBe(500);
  });
});

describe("Verify comment delete routs", () => {
  it("test delete comment, should respond with 204 status code", async () => {
    const response = await request.delete(`/comment/${commentID}`);
    expect(response.status).toBe(204);
  });

  it("test delete comment, should respond with 500 status code", async () => {
    const response = await request.delete("/comment/0");
    expect(response.status).toBe(500);
  });
});

describe("Verify post delete routs", () => {
  it("test delete post, should respond with 204 status code", async () => {
    console.log(id);

    const response = await request.delete(`/post/${id}`);
    expect(response.status).toBe(204);
  });

  it("test delete post, should respond with 500 status code", async () => {
    const response = await request.delete("/post/0");
    expect(response.status).toBe(500);
  });
});
