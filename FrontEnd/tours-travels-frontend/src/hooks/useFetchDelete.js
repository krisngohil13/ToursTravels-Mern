import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const useFetchDelete = (endpoint, queryParams,id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const response = await axios.delete(`${BASE_URL}/tours/${id}`,{
          params: queryParams,
          headers:{"Authorization":JSON.parse(localStorage.getItem("user")).token}
        });
        setData(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, queryParams]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetchDelete;
