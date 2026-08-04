import { useMemo, useState } from "react";
import {
    FaCopy,
    FaTrash,
    FaExternalLinkAlt,
    FaChartBar,
    FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useUrl from "../../hooks/useUrl";

import "./UrlTable.css";

const UrlTable = ({ urls = [], loading }) => {
    const navigate = useNavigate();
    const { removeUrl } = useUrl();
    const [search, setSearch] = useState("");

    const filteredUrls = useMemo(() => {
        return urls.filter((url) => {
            const query = search.toLowerCase();
            return (
                url.longUrl.toLowerCase().includes(query) ||
                url.shortCode.toLowerCase().includes(query)
            );
        });
    }, [urls, search]);

    const handleCopy = async (shortCode) => {
        const shortUrl = `http://localhost:5000/${shortCode}`;
        await navigator.clipboard.writeText(shortUrl);
        toast.success("Copied to clipboard");
    };

    const handleDelete = async (shortCode) => {
        if (!window.confirm("Delete this URL?")) return;
        await removeUrl(shortCode);
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="table-loading">
                Loading URLs...
            </div>
        );
    }
    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Your URLs</h2>
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search URL..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Short URL</th>
                        <th>Original URL</th>
                        <th>Clicks</th>
                        <th>Expiry</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUrls.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="empty"
                            >
                                No URLs Found
                            </td>
                        </tr>
                    ) : (
                        filteredUrls.map((url) => (
                            <tr key={url._id}>
                                <td>
                                    {url.shortCode}
                                </td>
                                <td className="long-url">
                                    {url.longUrl}
                                </td>
                                <td>
                                    {url.clicks}
                                </td>
                                <td>
                                    {url.expiresAt
                                        ? new Date(
                                              url.expiresAt
                                          ).toLocaleDateString()
                                        : "Never"}
                                </td>
                                <td>
                                    <div className="actions">
                                        <button
                                            onClick={() =>
                                                handleCopy(
                                                    url.shortCode
                                                )
                                            }
                                        >
                                            <FaCopy />
                                        </button>
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `http://localhost:5000/${url.shortCode}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <FaExternalLinkAlt />
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/analytics/${url.shortCode}`
                                                )
                                            }
                                        >
                                            <FaChartBar />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    url.shortCode
                                                )
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UrlTable;