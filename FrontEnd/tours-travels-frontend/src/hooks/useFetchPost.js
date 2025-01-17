import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const useFetchPost = (endpoint, queryParams) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Ensure we get the token from localStorage correctly
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;

        const response = await axios.post(
          `${BASE_URL}/${endpoint}`,
          queryParams, // Pass queryParams as the request body
          {
            headers: {
              "Authorization": `Bearer ${token}`, // Attach the token to the Authorization header
            }
          }
        );

        setData(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint, queryParams]);

  return { data, error, loading };
};

export default useFetchPost;
