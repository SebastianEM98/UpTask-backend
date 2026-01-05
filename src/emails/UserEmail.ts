import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

type EmailTemplate = {
    title: string
    heading: string
    bodyText: string
    buttonText: string
    buttonLink: string
    showExpiration?: boolean
}

const EMAIL_TEMPLATES: Record<'CONFIRM_ACCOUNT' | 'RESET_PASSWORD', EmailTemplate> = {
    CONFIRM_ACCOUNT: {
        title: 'Confirm Your Account',
        heading: 'Welcome to UpTask',
        bodyText: 'Please confirm your account by clicking the button below.',
        buttonText: 'Confirm Account',
        buttonLink: '/auth/confirm-account/',
        showExpiration: true
    },
    RESET_PASSWORD: {
        title: 'Reset Your Password',
        heading: 'UpTask Notification',
        bodyText: 'Reset your password by clicking on the following link.',
        buttonText: 'Reset Password',
        buttonLink: '/auth/reset-password/',
        showExpiration: true
    }
}


export class UserEmail {

    static sendConfirmationEmail = async (user: IEmail) => {
        const template = EMAIL_TEMPLATES.CONFIRM_ACCOUNT

        await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: "Confirm Your Account - UpTask",
            text: `Hello ${user.name}, please confirm your account by clicking the following link`,
            html: setHTMLTemplate(template, user)
        })
    }


    static sendPasswordResetEmail = async (user: IEmail) => {
        const template = EMAIL_TEMPLATES.RESET_PASSWORD

        await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: "Reset Password - UpTask",
            text: `Hello ${user.name}, you can reset your password by clicking on the following link`,
            html: setHTMLTemplate(template, user)
        })
    }
}


function setHTMLTemplate(template: EmailTemplate, user: IEmail): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${template.title}</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
        <table width="100%" bgcolor="#f4f4f4">
            <tr>
                <td align="center" style="padding:20px 10px;">
                    <table width="100%" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;">
                        <tr>
                            <td align="center" bgcolor="#1e2939" style="padding:20px;">
                                <h1 style="margin:0;color:#fff;font-size:24px;">${template.heading}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:30px 20px;text-align:center;">
                                <p style="font-size:16px;color:#333;">
                                    Hello <strong>${user.name}</strong>,<br><br>
                                    ${template.bodyText}
                                </p>

                                <p style="margin:30px 0;">
                                    <a href="${process.env.FRONTEND_URL}${template.buttonLink}${user.token}"
                                    style="display:inline-block;background:#ad46ff;color:#fff;padding:12px 24px;border-radius:5px;font-weight:bold;text-decoration:none;">
                                        ${template.buttonText}
                                    </a>
                                </p>

                                ${template.showExpiration ? 
                                    `<p style="font-size:13px;color:#666;margin-bottom:30px;">
                                        For security reasons, this link will expire in 30 minutes.
                                    </p>` 
                                    : '' 
                                }

                                <p style="font-size:14px;color:#555;">
                                    If you did not request this action, please ignore this email.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" bgcolor="#f4f4f4" style="padding:20px;font-size:12px;color:#777;">
                                <p>&copy; ${new Date().getFullYear()} UpTask. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
}
