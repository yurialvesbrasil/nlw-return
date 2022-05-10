export interface SendMailData {
    subject: string;
    body: string;
}

export interface MailInterface {
    send(data: SendMailData): Promise<void>;
}