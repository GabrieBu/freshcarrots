import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Custom hook to fetch the top five movies for the hero section.
 *
 * This hook retrieves a list of top 5 movies from the `/getTopFiveMovies` endpoint.
 *
 * @function useHeroSection
 *
 * @returns {Object} An object containing:
 * - {Array} movies - An array of the top five movie objects.
 * - {boolean} loading - Indicates if the data is currently being fetched.
 * - {boolean} error - Indicates if an error occurred during the fetch.
 *
 * @example
 * const { movies, loading, error } = useHeroSection();
 *
 * @description
 * - Fetches movie data once on initial render.
 * - Designed for the homepage hero section.
 * - Automatically manages loading and error states.
 */
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