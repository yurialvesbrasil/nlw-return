import { MailInterface, SendMailData } from "../mail_interface";
import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f4ed9f54eb89ad",
        pass: "3f0a5263f11d22"
    }
});

export class NodemailerMailAdapter implements MailInterface {
    async send(data: SendMailData): Promise<void> {
        //Envia email
        await transport.sendMail({
            from: '"Feedback" <oi@feedget.com>',
            to: 'Yuri Brasil <yuribrasil@gmail.com>',
            subject: `Novo feedback ${data.subject}`,
            html: data.body,
        });
    }

}