import { useState } from "react";
import { FaLink } from "react-icons/fa";
import UrlCard from "../UrlCard/UrlCard";
import useUrl from "../../hooks/useUrl";

import "./UrlForm.css";

const UrlForm = () => {
    const [formData, setFormData] = useState({
        longUrl: "",
        customAlias: "",
        expiresIn: "",
    });

    const [generatedUrl, setGeneratedUrl] = useState(null);

    // Custom Hook
    const { createUrl, loading } = useUrl();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await createUrl(formData);

            setGeneratedUrl(data);

            setFormData({
                longUrl: "",
                customAlias: "",
                expiresIn: "",
            });
        } catch (error) {
            // Error toast is already handled inside useUrl()
            console.error(error);
        }
    };

    return (
        <div className="url-form-container">
            <form
                className="url-form"
                onSubmit={handleSubmit}
            >
                <div className="input-group">
                    <FaLink />

                    <input
                        type="url"
                        name="longUrl"
                        placeholder="Enter Long URL"
                        value={formData.longUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row">
                    <input
                        type="text"
                        name="customAlias"
                        placeholder="Custom Alias (Optional)"
                        value={formData.customAlias}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="expiresIn"
                        placeholder="Expiry (Days)"
                        value={formData.expiresIn}
                        onChange={handleChange}
                        min="1"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Shorten URL"}
                </button>
            </form>

            {generatedUrl && (
                <UrlCard url={generatedUrl} />
            )}
        </div>
    );
};

export default UrlForm;