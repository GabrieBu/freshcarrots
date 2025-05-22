import axios from 'axios'
import { useEffect, useState } from 'react'

/*
* Hook used to get top 5 movies filtered by rating DESC
* */

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
        console.error("Error five topMovies: " + err);
        setError(true); 
        setLoading(false);
      });
  }, []); 

  return { movies, loading, error };
}