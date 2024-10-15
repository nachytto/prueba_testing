const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    

    it("Test GET/cafes devuelve status code 200 y el tipo de dato recibido de por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });


    it("Test DELETE/cafes/:id id inexistente devuelve 404", async () => {
        const idInexistente = 999;
        const response = await request(server).delete(`/cafes/${idInexistente}`).set("Authorization", "token-valido");
        expect(response.statusCode).toBe(404);
    });


    it("Test POST/cafes al agregar un nuevo cafe devuelve un 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(server).post("/cafes").send(nuevoCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.find(c => c.id === nuevoCafe.id)).toBeTruthy();
    });

    it("Test PUT/cafes/:id devuelve status code 400 si el cafe enviado posee un id diferente", async () => {
        const cafeModificado = { id: 6, nombre: "Espresso" };
        const response = await request(server).put("/cafes/1").send(cafeModificado);
        expect(response.statusCode).toBe(400);
    });

});
