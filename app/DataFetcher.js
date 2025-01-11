import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use dynamic API URL based on environment
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/some-data';
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from MongoDB</h1>
      {data.length === 0 ? (
        <p>Nu s-au gasit evenimente momentan.</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;
