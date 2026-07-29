import { use, useState } from "react";
import { FaLink } from "react-icons/fa";
import toast from 'react-hot-toast';

import { createShortUrl } from "../../services/url.service.js";
import UrlCard from "../UrlCard/UrlCard";

const UrlForm = () => {
    const [formData, setFormData] = useState({
        longUrl: "",
        customAlias: "",
        expiresIn: ""
    });

    const [loading, setLoading] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.longUrl.trim()){
            toast.error("Please Enter a Valid URL");
            return;
        }
        try{
            setLoading(true);
            const response = await createShortUrl(formData);
            setGeneratedUrl(response.data.data);
            toast.success("Short URL Created Successfully");
            setFormData({
                longUrl: "",
                customAlias: "",
                expiresIn: ""
            });
        }catch(error){
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="url-form-container">
            <form>
                <div className="input-group">
                    <FaLink/>
                    <input
                        type="url"
                        name="longUrl"
                        placeholder="Enter long Url"
                        value={formData.longUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row">
                    <input
                        type='text'
                        name='customAlias'
                        placeholder="Customer Alias (optional)"
                        value={formData.customAlias}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="expiresIn"
                        placeholder="Expiry (Days)"
                        value={formData.expiresIn}
                        onChange={handleChange}
                        min='1'
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Creating..."
                            : "Shorten URL"
                    }
                </button>
            </form>
            {
                generatedUrl &&
                <UrlCard url={generatedUrl}/>
            }
        </div>
    )
};

export default UrlForm;