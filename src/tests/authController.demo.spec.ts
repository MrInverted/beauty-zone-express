import request from "supertest";
import { app } from "../server";
import { connectMongoose, createDemoUser, disconnectMongoose } from "./demo";



beforeAll(async () => {
  await connectMongoose();
  await createDemoUser();
})

afterAll(async () => {
  await disconnectMongoose();
})



describe("/api/auth/register", () => {
  it("email is already exists", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "string",
        surname: "string",
        email: "test",
        password: "string",
        state: "string",
        city: "string",
        street: "string",
        building: "string",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err", "Аккаунт с таким email уже существует");
  });
});



describe("/api/auth/login", () => {
  it("wrong email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "__wrong__",
        password: "string",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Пользователь с данным email не найден");
  });

  it("wrong password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test",
        password: "__wrong__",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Неверный пароль");
  });
});



describe("/api/auth/verify", () => {
  it("wrong token", async () => {
    const response = await request(app)
      .post("/api/auth/verify")
      .send({
        token: "eyJhbGciOiJIUzI1NiJ9.NjY5M2RjOTM1NGI5YjM2MGYwMWVmZTE3.cIjr1VgRbAFcM_BRW-HmYxJp6CfRiaORotQWu5QOeUc"
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Такой пользователь не существует");
  });
});



describe("/api/auth/recovery", () => {
  it("wrong email", async () => {
    const response = await request(app)
      .post("/api/auth/recovery")
      .send({
        email: "__wrong__"
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Пользователь с данным email не найден");
  });
});



describe("/api/auth/recovery-password", () => {
  it("wrong email", async () => {
    const response = await request(app)
      .patch("/api/auth/recovery-password")
      .send({
        email: "__worng__",
        code: "123456789",
        passwordOne: "string",
        passwordTwo: "string",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("err", "Пользователь с данным email не найден");
  });
});
