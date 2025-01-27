import { useState, useContext } from "react";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const useFetchDelete = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const deleteData = async (url) => {
    setLoading(true);
    try {
      const cleanUrl = url.replace(/^\/+/, '').replace(/\/+/g, '/');
      const headers = {
        'Content-Type': 'application/json'
      };

      const token = user?.token || localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(`${BASE_URL}${cleanUrl}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, error, loading };
};

export default useFetchDelete;
