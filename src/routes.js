const express = require("express");

const routes = express.Router();

const UserController = require("./Controllers/UserController");

// rotas sem autenticação
// routes.post("/auth", AuthController.auth);

// rotas com autenticação

routes.post("/singup", UserController.singup);
routes.post("/singin", UserController.singin);

routes.get("/user/:id", UserController.getOne);

module.exports = routes;
