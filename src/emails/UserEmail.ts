import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class UserEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: "Confirm Your Account - UpTask",
            text: `Hello ${user.name}, please confirm your account by clicking the following link`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirm Your Account</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#f4f4f4">
                        <tr>
                            <td align="center" style="padding: 20px 10px;">
                                <!-- Main Content -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                                    <tr>
                                        <td align="center" bgcolor="#1e2939" style="padding: 20px;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Welcome to UpTask</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 30px 20px; text-align: center;">
                                            <p style="font-size: 16px; color: #333333; margin: 0;">
                                                Hello <strong>${user.name}</strong>,<br><br>
                                                Please confirm your account by clicking the button below.
                                            </p>
                                            <p style="margin: 30px 0;">
                                                <a href="${process.env.FRONTEND_URL}/confirm-account/${user.token}"
                                                style="display: inline-block; background-color: #ad46ff; color: #ffffff; text-decoration: none; font-size: 16px; padding: 12px 24px; border-radius: 5px; font-weight: bold;">
                                                Confirm Account
                                                </a>
                                            </p>
                                            <p style="font-size: 13px; color: #666666;margin-bottom: 30px;">
                                                For security reasons, this confirmation link will expire in 30 minutes.
                                            </p>
                                            <p style="font-size: 14px; color: #555555;">
                                                If you did not create an account, please ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" bgcolor="#f4f4f4" style="padding: 20px; font-size: 12px; color: #777777;">
                                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} UpTask. All rights reserved.</p>
                                            <p style="margin: 5px 0;">
                                                Need help? <a href="mailto:support@uptask.com" style="color: #007bff; text-decoration: none;">Contact Support</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        })
    }
}

