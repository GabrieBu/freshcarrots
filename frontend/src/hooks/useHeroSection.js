import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useHeroSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `http://localhost:3000/getTopFiveMovies`,
    })
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true); 
        setLoading(false);
      });
  }, []); 

  return { movies, loading, error };
}