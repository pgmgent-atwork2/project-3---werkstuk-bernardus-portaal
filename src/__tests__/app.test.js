import DataSource from '../lib/DataSource.js';
import app from '../app.js';
import request from "supertest";
import jest from "jest-mock";

import { home } from '../controllers/home.js';

let server;

describe("Interests API tests", () => {
beforeAll(async () => {
   // 1. Create a connection with the database and WAIT!
   await DataSource.initialize();

   // 2. Application, start listening for incoming requests (used during test)
   server = app.listen(process.env.PORT, () => {
   console.log(
      `Application is running on http://localhost:${process.env.PORT}/.`
   );
   });
});

afterAll(async () => {
   // 1. Close the connection with the database
   await DataSource.destroy();

   // 2. Close the server
   server.close();
});

describe("Testing HTTP methods", () => {
   test("GET - /api/interests", async () => {
   // request verzenden
   const response = await request(app).get("/api/interests");
   // voorwaarden controleren
   expect(response.statusCode).toBe(200);
   expect(Array.isArray(response.body)).toBeTruthy();
   });

   test("POST - /api/user", async () => {
   // post request verzenden
   const response = await request(app)
      .post("/api/users")
      .send({
         firstname: "Frederick",
         lastname: "Roegiers",
         user_meta: {
         address: "Invalidenstraat 6",	
         zipCode: "9041",
         city: "Oostakker",
         },
         role: {
         name: "admin",
         },
      });
      // controleren op statuscode
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id");
   });

})

describe("Render tests", () => {
   test("GET - Testing the home page", async () => {
   // request en response aanmaken
   const req = {};
   const res = { render: jest.fn() };

   // de home controller aanroepen
   await home(req, res);

   expect(res.render.mock.calls[0][0]).toBe("home");
   expect(res.render.mock.calls[0][1]).toEqual(
      expect.objectContaining({
         menuItems: expect.any(Array),
         userData: {
         firstname: expect.any(String),
         lastname: expect.any(String),
         id: expect.any(Number),
         interests: expect.any(Array)
         },
      })
   )
});

});
});