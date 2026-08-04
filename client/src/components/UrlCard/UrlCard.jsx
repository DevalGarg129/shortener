import { FaCopy, FaExternalLinkAlt, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./UrlCard.css";

const UrlCard = ({ url }) => {
    const navigate = useNavigate();

    if (!url) return null;

    const shortUrl =
        url.shortUrl ||
        `${window.location.origin}/${url.shortCode}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            toast.success("Copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy URL");
        }
    };

    const openUrl = () => {
        window.open(shortUrl, "_blank");
    };

    return (
        <div className="url-card">
            <h2>Your Short URL is Ready </h2>
            <div className="short-url">
                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {shortUrl}
                </a>
            </div>

            <div className="card-info">
                <div>
                    <span>Original URL</span>
                    <p>{url.longUrl}</p>
                </div>
                <div>
                    <span>Short Code</span>
                    <p>{url.shortCode}</p>
                </div>
                <div>
                    <span>Clicks</span>
                    <p>{url.clicks ?? 0}</p>
                </div>
            </div>

            <div className="card-buttons">
                <button
                    className="copy-btn"
                    onClick={copyToClipboard}
                >
                    <FaCopy />
                    Copy
                </button>
                <button
                    className="open-btn"
                    onClick={openUrl}
                >
                    <FaExternalLinkAlt />
                    Open
                </button>
                <button
                    className="analytics-btn"
                    onClick={() =>
                        navigate(`/analytics/${url.shortCode}`)
                    }
                >
                    <FaChartBar />
                    Analytics
                </button>
            </div>
        </div>
    );
};

export default UrlCard;