// importar a função do sendEmail controller
const EmailController = require("./EmailController");
const EmailQueue = require("../queue/MailQueue");
const MailQueue = require("../queue/MailQueue");

jest.mock("../queue/MailQueue.js");

describe("Email Controller", () => {
  // essa função sera chamada antes de um caso de teste
  // utiliza-se para limpar todas as informações do mock após executado
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const request = {
    body: {
      email: "teste@teste.com",
      firstName: "Lucas",
      lastName: "Dantas",
    },
  };

  /*utilizando mockup
  Como o send esta sendo meio que sendo chamado dentro do code
  utilizar o mockReturnThis para retornar o proprio objeto 
  assim ele tem acesso ao metodo send */

  const reply = {
    code: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should sent email sucessfuly", async () => {
    "return reply.code(200).send();";

    const template = `
        Olá ${request.body.firstName} ${request.body.lastName}, sua assinatura foi confirmada!
        Para acessar seus recursos exclusivos você precisa basta clicar aqui.
    `;

    // invoke
    await EmailController.sendEmail(request, reply);

    // após o chamar a função, precisamos fazer as assersoes com expect
    // Esperamos que a função MailQueue seja chamada e add um novo email para ser disparado
    // E que o controller retorne code status 200

    // Verificar se EmailQueue foi chamado apenas 1 vez
    expect(EmailQueue.add).toHaveBeenCalledTimes(1);
    // Verificar se EmailQueue esta adicionando os parâmetros corretos
    expect(EmailQueue.add).toHaveBeenCalledWith({
      to: "teste@teste.com",
      from: process.env.EMAIL_FROM,
      subject: "Assinatura Confirmada",
      text: template,
    });
    // verificar se resposta do status code é 200
    expect(reply.code).toHaveBeenCalledWith(200);
  });

  // caso de teste em que verifica um cenário de erro disparado
  it("Should return error when not sent email", async () => {

    // Configura o retorno do mock, forçando retornar uma exceção
    MailQueue.add.mockRejectedValue(new Error("Mocking Exception"));

    await EmailController.sendEmail(request, reply);

    //verificar se foi chamado apenas uma vez
    expect(EmailQueue.add).toHaveBeenCalledTimes(1);
    //verificar se status code é 500
    expect(reply.code).toHaveBeenCalledWith(500);
    // verificar se resposta do send corresponde com cenário real
    expect(reply.send).toHaveBeenCalledWith("Internal Server Error");
  });
});
