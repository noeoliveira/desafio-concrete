// eslint-disable-next-line import/order
const app = require("../../src/app");
const faker = require("faker/locale/pt_BR");
const request = require("supertest")(app);
const status = require("http-status");

const body = {
	nome: faker.name.findName(),
	email: faker.internet.email(),
	senha: faker.internet.password(),
	telefones: [
		{
			numero: faker.phone.phoneNumber("#####-####"),
			ddd: faker.phone.phoneNumber("##")
		}
	]
};

describe("Authentication", () => {
	it("should create user authenticated", async done => {
		const response = await request.post("/singup").send(body);

		expect(response.status).toEqual(status.CREATED);

		expect(Object.keys(response.body)).toEqual([
			"id",
			"nome",
			"email",
			"telefones",
			"token",
			"data_criacao",
			"data_atualizacao",
			"ultimo_login"
		]);
		done();
	});

	it("should return email already exists", async done => {
		const response = await request.post("/singup").send(body);

		expect(response.status).toEqual(status.BAD_REQUEST);

		expect(response.body).toEqual({
			error: "E-mail já existente"
		});
		done();
	});

	it("should user and token", async done => {
		const response = await request
			.post("/singin")
			.send({ email: body.email, senha: body.senha });

		expect(response.status).toEqual(status.OK);

		done();
	});

	it('should "Usuário e/ou senha inválidos" per error in password', async done => {
		const response = await request
			.post("/singin")
			.send({ email: body.email, senha: faker.internet.password() });

		expect(response.status).toEqual(status.UNAUTHORIZED);

		expect(response.body).toEqual({ error: "Usuário e/ou senha inválidos" });

		done();
	});

	it('should "Usuário e/ou senha inválidos" per error in email', async done => {
		const response = await request
			.post("/singin")
			.send({ email: faker.internet.email(), senha: body.senha });

		expect(response.status).toEqual(status.BAD_REQUEST);

		expect(response.body).toEqual({ error: "Usuário e/ou senha inválidos" });

		done();
	});
});
