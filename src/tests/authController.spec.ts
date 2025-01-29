import request from "supertest";
import { app } from "../server";



describe("/api/auth/register", () => {
  it("no body", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Поля name, surname, email, password, state, city, street, building не указаны");
  });

  it("no name", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: null,
        surname: "string",
        email: "string",
        password: "string",
        state: "string",
        city: "string",
        street: "string",
        building: "string",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Поля name не указаны");
  });
});



describe("/api/auth/login", () => {
  it("no body", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Поля email, password не указаны");
  });

  it("no password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "string"
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Поля password не указаны");
  });
});



describe("/api/auth/verify", () => {
  it("no token", async () => {
    const response = await request(app)
      .post("/api/auth/verify")
      .send({
        token: null
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Токен отсутсвует");
  });

  it("wrong token", async () => {
    const response = await request(app)
      .post("/api/auth/verify")
      .send({
        token: "__wrong__"
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Неверный токен");
  });
});



describe("/api/auth/recovery", () => {
  it("no email", async () => {
    const response = await request(app)
      .post("/api/auth/recovery")
      .send({
        email: null
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Email отсутствует");
  });
});



describe("/api/auth/recovery-password", () => {
  it("no email", async () => {
    const response = await request(app)
      .patch("/api/auth/recovery-password")
      .send({
        email: null,
        code: "string",
        passwordOne: "string",
        passwordTwo: "string",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Поля email не указаны");
  });

  it("wrong code", async () => {
    const response = await request(app)
      .patch("/api/auth/recovery-password")
      .send({
        email: "string",
        code: "__wrong__",
        passwordOne: "string",
        passwordTwo: "string",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Неверный код активации");
  });

  it("passwords do not match", async () => {
    const response = await request(app)
      .patch("/api/auth/recovery-password")
      .send({
        email: "string",
        code: "string",
        passwordOne: "123",
        passwordTwo: "1234",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Пароли не совпадают");
  });
});