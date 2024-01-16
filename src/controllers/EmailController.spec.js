
// importar a função do sendEmail controller
const EmailController = require('./EmailController');

describe('Email Controller', () => {
    test('should sent email sucessfuly', () => {
        const request = {
            body: {
                email: "teste@teste.com",
                firstName: "Lucas",
                lastName: "Dantas"
            }
        }
        /*utilizando mockup

        "return reply.code(200).send();"

        Como o send esta sendo meio que sendo chamado dentro do code
        utilizar o mockReturnThis para retornar o proprio objeto 
        assim ele tem acesso ao metodo send */

        const reply = {
            code: jest.fn().mockReturnThis(), 
            send: jest.fn()
        }

        EmailController.sendEmail(request, reply)   
    });
});