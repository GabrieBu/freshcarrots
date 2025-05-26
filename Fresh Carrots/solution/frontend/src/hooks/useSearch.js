import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Custom hook to search for movies by title.
 *
 * This hook sends a GET request (`/getMovieByName`)
 * when the user types in the search bar. It implements debouncing to reduce
 * unnecessary API calls, and it cancels previous requests if a new one is triggered.
 *
 * @function useSearch
 * @param {string} query - The user's search input (movie title).
 *
 * @returns {Object} An object containing:
 * - {Array} moviesSearched - An array of movie objects returned from the API.
 * - {boolean} loading - Indicates whether the request is in progress.
 * - {boolean} error - Indicates if there was an error during the fetch.
 *
 * @example
 * const { moviesSearched, loading, error } = useSearch("Batman");
 *
 * @description
 * - Avoids unnecessary API calls if the query is less than 2 characters or empty.
 * - Cancels previous axios requests when a new search is initiated.
 * - Useful for search bars, especially in reusable components like a Navbar.
 */
export default function useSearch(query) {
    const [moviesSearched, setMoviesSearched] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!query.trim() || query.length < 2) { //unnecessary calling api
            setMoviesSearched([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(false);

        const timeoutId = setTimeout(() => {
            let cancel;
            axios({
                method: "GET",
                url: `http://localhost:3000/getMovieByName`,
                params: { name: query },
                cancelToken: new axios.CancelToken((c) => (cancel = c))
            })
                .then((res) => {
                    setMoviesSearched(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (axios.isCancel(err)) return;
                    console.error("Error fetching movies: " + err);
                    setError(true);
                    setMoviesSearched([]);
                    setLoading(false);
                });

            return () => cancel();
        }, 500); // debounce time

        return () => clearTimeout(timeoutId);
    }, [query]);

    return { moviesSearched, loading, error };
}