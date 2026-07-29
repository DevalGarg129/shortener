import mongoose from "mongoose";
import express from "express";
import { 
    createShortUrlShortener, 
    deleteShortUrlController, 
    getUrlDetailsController, 
    redirectUrlController 
} from "../controllers/url.controller.js";
import { Router } from "express";
import { deleteShortUrl } from "../services/shortener.service.js";
const router = express.Router();

router.post("/", createShortUrlShortener);
router.get("/:shortCode", redirectUrlController);
router.get("/details/:shortCode", getUrlDetailsController);
router.delete("/:shortCode", deleteShortUrlController);
export default router;