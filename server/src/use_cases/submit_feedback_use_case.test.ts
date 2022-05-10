import { SubmitFeedbackUseCase } from "./submit_feedback_use_case";

describe('Submit feedback', () => {
    // Funções espiãs
    const createFeedbackSpy = jest.fn();
    const sendEmailSpy = jest.fn();

    //Cria o mock do repositório e adapter
    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { send: sendEmailSpy }
    );

    test('should be able to submit a feedback', async () => {
        //Espera-se que resolva/retorne alguma coisa e não um erro
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,dsadads'
        })).resolves.not.toThrow();

        //Espera-se que as funções de criação de feedback e envio de email sejam chamadas
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    })

    test('should not be able to submit a feedback without type', async () => {
        //Espera-se que retorne um erro
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,dsadads'
        })).rejects.toThrow('Type and comment are required');
    })

    test('should not be able to submit a feedback without comment', async () => {
        //Espera-se que retorne um erro
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,dsadads'
        })).rejects.toThrow('Type and comment are required');
    })

    test('should not be able to submit a feedback with an invalid screenshot', async () => {
        //Espera-se que retorne um erro
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base65,'
        })).rejects.toThrow('Invalid base64 image');
    })

})
