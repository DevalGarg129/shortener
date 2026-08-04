import { useState } from "react";
import toast from "react-hot-toast";

import {
    createShortUrl,
    getAllUrls,
    deleteUrl,
    getAnalytics,
    updateExpiry,
} from "../services/url.service";

const useUrl = () => {
    const [loading, setLoading] = useState(false);

    const createUrl = async (data) => {
        try {
            setLoading(true);

            const response = await createShortUrl(data);

            toast.success("Short URL created successfully");

            return response.data.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create URL"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchUrls = async () => {
        try {
            setLoading(true);

            const response = await getAllUrls();

            return response.data.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch URLs"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeUrl = async (shortCode) => {
        try {
            setLoading(true);

            await deleteUrl(shortCode);

            toast.success("URL deleted successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete URL"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async (shortCode) => {
        try {
            setLoading(true);

            const response = await getAnalytics(shortCode);

            return response.data.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch analytics"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editExpiry = async (shortCode, data) => {
        try {
            setLoading(true);

            const response = await updateExpiry(shortCode, data);

            toast.success("Expiry updated successfully");

            return response.data.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update expiry"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        createUrl,
        fetchUrls,
        removeUrl,
        fetchAnalytics,
        editExpiry,
    };
};

export default useUrl;