import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const useFetchPut = (queryParams) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = async (endpoint, id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/tours/${id}`, updatedData, {
        params: queryParams,
        headers:{"Authorization":JSON.parse(localStorage.getItem("user")).token}
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    updateData,
  };
};

export default useFetchPut;
