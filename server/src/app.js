import dotenv from "dotenv"
dotenv.config();

import morgan from "morgan";
import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();

import connectDb from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
    return res.json({
        success: true,
        message: "Server is running"
    });
});
app.use("/api/v1/url", urlRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on the Port ${PORT}`);
});

export default app;