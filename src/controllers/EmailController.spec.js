// importar a função do sendEmail controller
const EmailController = require("./EmailController");
const EmailQueue = require("../queue/MailQueue");

jest.mock("../queue/MailQueue.js");

describe("Email Controller", () => {
  test("should sent email sucessfuly", async () => {
    const request = {
      body: {
        email: "teste@teste.com",
        firstName: "Lucas",
        lastName: "Dantas",
      },
    };
    /*utilizando mockup

        "return reply.code(200).send();"

        Como o send esta sendo meio que sendo chamado dentro do code
        utilizar o mockReturnThis para retornar o proprio objeto 
        assim ele tem acesso ao metodo send */

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

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
   /* expect(EmailQueue.add).toHaveBeenCalledWith({
      to: "teste@teste.com",
      from: process.env.EMAIL_FROM,
      subject: "Assinatura Confrmada",
      text: template,
    });*/

    expect(reply.code).toHaveBeenCalledWith(200);
  });
});
