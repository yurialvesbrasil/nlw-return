import { FeedbackCreateInterface, FeedbacksInterface } from "../feedbacks_interface";
import { prisma } from '../../prisma';
import { Feedback } from '@prisma/client';

export class PrismaFeedbacksRepository implements FeedbacksInterface {
    async create(newFeedback: FeedbackCreateInterface): Promise<void> {
        try {
            await prisma.feedback.create({
                data: {
                    ...newFeedback,
                }
            });
        } catch (err) {
            throw new Error(`Erro na criação do feedback: ${err}`);
        }
    }

}