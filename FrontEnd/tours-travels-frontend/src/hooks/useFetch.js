import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const useFetch = (endpoint, queryParams = {}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use a ref to track if the component is still mounted
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Ensure no trailing or extra slashes in the constructed URL
        const url = `${BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const response = await axios.get(url, {
          params: queryParams,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // Only set state if the component is still mounted
        if (isMounted.current) {
          // If the API returns a nested 'data' key, adjust accordingly.
          setData(response.data.data || response.data); // Use response.data directly or response.data.data based on the API response structure.
        }
      } catch (err) {
        console.error("Error in useFetch:", err);
        if (isMounted.current) {
          setError(err.response?.data?.message || "An error occurred");
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates if unmounted
    return () => {
      isMounted.current = false;
    };
  }, [endpoint, JSON.stringify(queryParams)]); // Include dependencies safely

  return { data, error, loading };
};

export default useFetch;
