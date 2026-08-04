import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UrlTable from "../components/UrlTable/UrlTable";
import useUrl from "../hooks/useUrl";

const Dashboard = () => {
    const { fetchUrls, loading } = useUrl();
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const loadUrls = async () => {
            const data = await fetchUrls();
            setUrls(data);
        };
        loadUrls();
    }, []);

    return (
        <>
            <Navbar />
            <UrlTable
                urls={urls}
                onDelete={loadUrls}
                loading={loading}
            />
        </>
    );
};

export default Dashboard;