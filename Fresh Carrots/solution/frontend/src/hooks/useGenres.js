import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Custom hook to fetch the list of movie genres.
 *
 * This hook retrieves genre data from the `/getGenres` endpoint when the component mounts.
 * It formats the response to include `name` and `label` fields
 *
 * @function useGenres
 *
 * @returns {Object} An object containing:
 * - {Array} genres - Array of formatted genre objects with `{ name, label }` structure.
 * - {boolean} loading - Indicates if the data is currently being fetched.
 * - {boolean} error - Indicates if an error occurred during the fetch.
 *
 * @example
 * const { genres, loading, error } = useGenres();
 *
 * @description
 * - Automatically fetches genre data once on component mount.
 * - Useful for genre selectors or filters in movie search interfaces.
 * - Handles API call status with `loading` and `error` flags.
 */
export default function useGenres() {
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getGenres`,
        })
            .then((res) => {
                const formatted = res.data.map(item => ({
                    name: item.genreName,
                    label: item.genreName
                }));
                setGenres(formatted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return { genres, loading, error };
}