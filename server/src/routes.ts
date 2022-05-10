import { Feedback } from '@prisma/client';
import express from 'express';
import { SubmitFeedbackUseCase } from './use_cases/submit_feedback_use_case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer_mail_adapter';

export const routes = express.Router();

// Cadastra um novo feedback
routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot }: Feedback = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

    if (screenshot)
        await submitFeedbackUseCase.execute({ type, comment, screenshot });
    else
        await submitFeedbackUseCase.execute({ type, comment });


    return res.status(201).send();


})
