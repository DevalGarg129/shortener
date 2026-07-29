import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 8001;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();