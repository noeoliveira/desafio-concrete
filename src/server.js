const app = require("./app");

const { PORT } = process.env;

const server = app.listen(PORT || 5000, () => {
	console.log(`Server runner na port ${server.address().port}`);
});

module.exports = server;
