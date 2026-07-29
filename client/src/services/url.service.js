import api from "./api";

export const createShortUrl = (data) => 
    api.post("/url", data);

export const getAllUrls = () => 
    app.get("/url");

export const deleteUrl = (shortCode) => 
    api.delete(`/url/${shortCode}`);

export const updateExpiry = (shortCode, data) => 
    api.patch(`/url/${shortCode}`, data);

export const getAnalytics = (shortCode) =>
    api.get(`/url/${shortCode}/analytics`);