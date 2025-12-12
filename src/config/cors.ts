import { CorsOptions } from "cors"

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        const whitelist = [process.env.FRONTEND_URL]

        // Allow Postman or tools without origin
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    }
}