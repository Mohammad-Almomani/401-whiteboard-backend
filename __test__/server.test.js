"use strict";

const supertest = require("supertest");
const server = require("../server");
const request = supertest(server.app);
const base64 = require("base-64");

let id; //userID;

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
//   it("test create post, should respond with 201 status code", async () => {
//     const response = await request.post("/post").send({
//       title: "test title from create post",
//       content: "test content",
//     });
//     expect(response.status).toBe(201);
//     id = response._body.id;
//   });

  // it("test update post, should respond with 202 status code", async () => {
  //   console.log(id);
  //   const response = await request.put(`/post/${id}`).send({
  //     title: "new title from update post put",
  //     content: "new content",
  //   });
  //   expect(response.status).toBe(202);
  // });

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

  // it("test get one post, should respond with 200 status code", async () => {
  //   const response = await request.get(`/post/${id}`);
  //   expect(response.status).toBe(200);
  // });

  it("test get one post, should respond with 500 status code", async () => {
    const response = await request.get("/post/notExisting");
    expect(response.status).toBe(500);
  });
});

describe("Verify comment routs", () => {
  // it("test create comment, should respond with 201 status code", async () => {
  //   const response = await request.post("/comment").send({
  //     comment: "test title from create comment",
  //     postID: id,
  //   });
  //   expect(response.status).toBe(201);
  //   // commentID = response._body.id;
  // });

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

  it("test get one comment, should respond with 500 status code", async () => {
    const response = await request.get("/comment/notExisting/notExisting");
    expect(response.status).toBe(500);
  });
});

describe("Verify post delete routs", () => {
  // it("test delete post, should respond with 204 status code", async () => {
  //   console.log(id);

  //   const response = await request.delete(`/post/${id}`);
  //   expect(response.status).toBe(204);
  // });

  it("test delete post, should respond with 500 status code", async () => {
    const response = await request.delete("/post/0");
    expect(response.status).toBe(500);
  });
});

describe("Verify user routs", () => {
  // it("test create user, should respond with 201 status code", async () => {
  //   const response = await request.post("/signup").send({
  //     username: "testUser2",
  //     email: "testemai2l@test.com",
  //     password: "testPassword",
  //   });
  //   expect(response.status).toBe(201);
  //   userID = response._body.id;
  // });

  // it("test create user, should respond with 409 status code, already token", async () => {
  //   const response = await request.post("/signup").send({
  //     username: "testUser2",
  //     email: "testemai2l@test.com",
  //     password: "testPassword",
  //   });
  //   expect(response.status).toBe(409);
  // });

  // it("test login, should respond with 200 status code", async () => {
  //   const data = {
  //     username: "testUser2",
  //     password: "testPassword",
  //   };

  //   const encodedCredintial = base64.encode(
  //     `${data.username}:${data.password}`
  //   );
  //   const response = await request
  //     .post("/signIn")
  //     .set("Authorization", `Basic ${encodedCredintial}`);
  //   expect(response.status).toBe(200);
  // });

  it("test login, should respond with 500 status code", async () => {
    const data = {
      username: "notTestUser",
      password: "notTestPassword",
    };

    const encodedCredintial = base64.encode(
      `${data.username}:${data.password}`
    );
    const response = await request
      .post("/signIn")
      .set("Authorization", `Basic ${encodedCredintial}`);

    expect(response.status).toBe(401);
  });

  // it("test delete user, should respond with 204 status code", async () => {
  //   const response = await request.delete(`/user/${userID}`);
  //   expect(response.status).toBe(204);
  // });
});
