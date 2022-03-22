# FinAPI

<fig>
<img src="https://www.rocketseat.com.br/_next/image?url=https%3A%2F%2Fmedia.graphcms.com%2FRLe3Y2wGQ2CqbFEktNdG&w=256&q=100" alt="Logo da trilha Ignite ofertada pela Rocketseat.">
</fig>

## Tecnologias utilizadas

Foram utilizadas as seguintes tecnologias.

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)

## Inicialização
Para executar o projeto, utilize as etapas descritas abaixo.

* Clone o repositório do projeto.
* Utilize `yarn` para baixar todas as dependências.
* Utilize `yarn dev` para executar a aplicação.

Após isso o projeto estará rodando :blush:

## Links importantes
* [Rocketseat Ignite](https://www.rocketseat.com.br/ignite) :green_heart:

# FinAPI

## Introdução

> Este projeto foi desenvolvido durante a trilha ignite (node) ofertada pela rocketseat.

Este projeto tem como principal objetivo a simulação de uma aplicação bancária.

### Endpoints

| Nome | Funcionalidade|
|------|---------------|
|```GET``` /statement|Informa as movimentações realizadas pelo usuário.|
|```GET``` /statement/:date|Informa as movimentações realizadas pelo usuário em uma determinada data.|
|```GET``` /account|Informa os dados do usuário.|
|```GET``` /balance|Informa o saldo do usuário.|
|```POST``` /account|Realiza a criação de um usuário.|
|```POST``` /deposit|Realiza a criação de um depósito.|
|```POST``` /withdraw|Realiza a criação de uma retirada.|
|```PUT``` /account|Atualiza um usuário.|
|```DELETE``` /account|Deleta um usuário.|
