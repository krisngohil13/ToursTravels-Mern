import { useState } from "react";
import { BASE_URL } from "../utils/config";

const useFetchPut = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const putData = async (endpoint, updateData) => {
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
        method: 'PUT',
        headers,
        credentials: "include",
        body: JSON.stringify(updateData)
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

  return { putData, error, loading };
};

export default useFetchPut;
