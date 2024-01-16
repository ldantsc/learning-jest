# JEST INTRODUÇÃO/ANOTAÇÕES

Playlist das aulas da Fernanda Kipper - Youtube

https://www.youtube.com/playlist?list=PLNCSWIsR6ADKpmPxQ6ETmTtpbxdjR2tVo

Jest doc: https://jestjs.io/docs/getting-started

```js
// DESCRIBE  > escopo/bloco de teste - tests suites (onde declara um ou mais testes)
describe("param", () => {});
```

```js
// IT or TEST > declara um unico teste únitário - tests cases
it('param', () => {}) OR test('param', () => {})
```

```js
//EXPECT > validar resultados
expect();
```

- 'param': descrição/identificação do bloco de testes

- Exemplo: EmailService.js precisamos realizar 2 testes, tanto para o try e tanto para o catch, dentro de DESCRIBE, será realizado 2 IT/TEST.

- it também recebe 2 parametros

```js
//test suites
describe("Initial Tests", () => {
  // teste em si... Testando função de soma
  it("first test", () => {
    // create variable to result
    const result = sum(1, 2);
    // validar a variavel result que espera que seja igual a 3 a saida
    expect(result).toEqual(3);
  });
});
```

_npm test_

_SHOULD = "DEVE"_

```js
toBe(); checar valor com igualdade exata
```

toEqual()

---

## Mockup

docs mockup jest: https://jestjs.io/docs/mock-functions

```js
jest.fn();
```

- função de mock simula a função/objeto real
- serve para fazer validações nos testes unitarios

Exemplo:

```js
const reply = {
  code: jest.fn(),
};
```


# Projeto Original... redis-dba

Projeto final da cadeira de Banco de dados Avançado realizada no curso de Ciência da Computação na Universidade Federal de Pelotas. Buscamos realizar um estudo de caso com o banco NoSQL Redis, utilizando o mesmo como message broker em um sistema de disparo de e-mails em lote.


## Tecnologias utilizadas

- [Redis](https://redis.io/)
- [NodeJs](https://nodejs.org/)
    - [Bull](https://github.com/OptimalBits/bull)
    - [AWS.SES](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#constructor-property)

## Como executar

1. Clone o repositório e entre na pasta
2. Instale os pacotes utilizando o comando `npm install`
3. Crie um arquivo `.env` na raiz do projeto e insira suas credencias. Utilize o arquivo `.env.example` como base.
4. Rode o projeto com o comando `npm start`
