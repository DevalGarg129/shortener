const dotenv = require("dotenv");
dotenv.config();

const app = require("./app.js");
const connectDb = require("./config/db.js");

const PORT = process.env.PORT || 8001;

const startServer = async () => {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on the PORT ${PORT}`);
    });
};

startServer();
