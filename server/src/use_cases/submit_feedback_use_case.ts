import { MailInterface } from "../adapters/mail_interface";
import { FeedbacksInterface } from "../repositories/feedbacks_interface";


interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    //Desacopla aplicação do ORM do Prisma
    constructor(
        private feedbacksRepository: FeedbacksInterface,
        private mailAdapter: MailInterface
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest): Promise<void> {
        const { type, comment, screenshot } = request;

        if (!type || !comment) {
            throw new Error('Type and comment are required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
            throw new Error('Invalid base64 image');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.send({
            subject: ` ${type}`,
            body: [
                '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
                `<h1>Tipo do feedback ${type}</h1>`,
                `<p>Comentário:</br> ${comment}</p>`,
                '</div>'
            ].join('\n')
        });

    }
}