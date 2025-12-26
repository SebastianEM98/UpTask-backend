import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD
} = process.env

const config = () => {
    return {
        host: SMTP_HOST,
        port: +SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD
        },
        secure: false
    }
}

export const transporter = nodemailer.createTransport(config());