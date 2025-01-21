import { useState } from "react";
import { BASE_URL } from "../utils/config";

const useFetchPost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (endpoint, postData) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
      const token = sessionStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        credentials: "include",
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, error, loading };
};

export default useFetchPost;
