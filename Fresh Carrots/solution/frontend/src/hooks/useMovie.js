import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Custom hook to fetch information about a movie by its ID.
 *
 * This hook sends a GET request to the `/getMovieById` endpoint and retrieves
 * the movie data corresponding to the provided `id`.
 *
 * @function useMovie
 * @param {string|number} id - The unique identifier of the movie to fetch.
 *
 * @returns {Object} An object containing:
 * - {Object} movie - The movie object returned from the API.
 * - {boolean} loading - Indicates if the data is currently being fetched.
 * - {boolean} error - Indicates if an error occurred during the fetch.
 *
 * @example
 * const { movie, loading, error } = useMovie("12345");
 *
 * @description
 * - Automatically fetches movie details once when the component mounts.
 * - Automatically manages loading and error states.
 */
export default function useMovie(id) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getMovieById`,
            params: {
                id: id
            }
        })
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return { movie, loading, error };
}