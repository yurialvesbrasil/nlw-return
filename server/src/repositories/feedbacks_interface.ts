import { Feedback } from "@prisma/client";

export interface FeedbackCreateInterface {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksInterface {
    create(newFeedback: FeedbackCreateInterface): Promise<void>;
}
