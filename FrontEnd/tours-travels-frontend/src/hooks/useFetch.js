import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../utils/config";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Remove extra BASE_URL concatenation
        const url = `${BASE_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1"); // Clean up any double slashes
        
        const token = sessionStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await fetch(url, {
          headers,
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        if (isMounted.current) {
          setData(result.data || result);
        }
      } catch (err) {
        console.error("Error in useFetch:", err);
        if (isMounted.current) {
          setError(err.message);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [endpoint]);

  return { data, error, loading };
};

export default useFetch;
