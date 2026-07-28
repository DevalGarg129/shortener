import mongoose from "mongoose";

const router = express.Router();

router.post("/", (req, res) => {
    res.json({
        message: "Create A short URL API"
    });
});

router.get("/:shortCode", (req, res) => {
    res.json({
        message: "redirect URL"
    });
});

export default router;