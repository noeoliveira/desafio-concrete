require("../../src/app");
const User = require("../../src/db/models/User");

describe("Test Unit User", () => {
	it("should check password", async done => {
		const body = {
			nome: "Teste",
			email: "teste1@test.com",
			senha: "123123"
		};

		const user = await User.create(body).catch(console.log);

		expect(user.checkPassword(body.senha)).toEqual(true);
		await user.destroy();
		done();
	});
});
