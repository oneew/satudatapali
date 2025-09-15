// src/hooks/useDashboardData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useDashboardData = (token) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("/v1/files", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFiles(response.data.files);
            } catch (err) {
                setError(err);
                console.error("Error fetching files", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [token]);

    return { files, loading, error };
};

export default useDashboardData;// src/hooks/useDashboardData.js