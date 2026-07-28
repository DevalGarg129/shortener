const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/api/v1/url", urlRoutes);
app.get('/health', (req, res) => {
    return res.json({
        success: true,
        message: "Server is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on the Port ${PORT}`);
});