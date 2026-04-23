import express from 'express';
import { errorHandler } from './src/middlewares/error.middleware.js';
import router from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(cors({
    origin: 'https://mb-bookverse.netlify.app/',
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.get("/", async (req, res) => {
    res.send("Server is running...");
});


// app.get("/test-cookie", (req, res) => {
//     res.cookie('test', '123', {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 3600000
//     });
//     res.json({ message: "cookie set" });
// });

app.use('/api', router);

app.use(errorHandler);

export default app;