# desafio-concrete

[![License](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)

Desafio Concrete Solutions REST API NODE

## Desafio Concrete Solutions

Crie um aplicativo backend que exporá uma API RESTful de criação de sing up/sign in.

## Instalação do projeto

```
npm install

```

## Execução do projeto

```
npm start

```

## Sobre desenvolvimento

- Para utilização de Task Runner, optei pelo NPM SCRIPTS

- o banco de dados que estou utilizando é o Postgres

- O projeto também possui testes unitários e testes de integração porém não consegui terminar a cobertura dele a tempo

## Rotas

Cadastrar no sistema

```
POST https://desafio-concrete-s.herokuapp.com/signup/
```

Login no sistema

```
POST https://desafio-concrete-s.herokuapp.com/signin/
```

Buscar usuario

```
HEADER Authorization Berear {token}

GET https://desafio-concrete-s.herokuapp.com/user/:id/
```
