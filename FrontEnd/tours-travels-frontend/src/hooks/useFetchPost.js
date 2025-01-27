import { useState, useContext } from "react";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const useFetchPost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const postData = async (endpoint, postData) => {
    setLoading(true);
    try {
      const cleanEndpoint = endpoint.replace(/^\/+|\/+$/g, '');
      const baseUrl = BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/${cleanEndpoint}`;

      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const response = await fetch(url, {
        method: 'POST',
        headers,
        credentials: "include",
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create tour');
      }

      const result = await response.json();
      return result;

    } catch (err) {
      console.error('Post Error:', err);
      if (err.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your connection.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (endpoint, updateData) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
      const headers = {
        "Content-Type": "application/json",
      };
      
      const token = user?.token || localStorage.getItem("token");
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

  const deleteData = async (url) => {
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
    }
  };

  return { postData, error, loading, deleteData, updateData };
};

export default useFetchPost;
