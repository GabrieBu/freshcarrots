import {useEffect, useState} from "react";
import axios from "axios";
import movie from "../pages/Movie.jsx";

/**
 * Custom hook to fetch discussions related to a specific movie.
 *
 * This hook makes a GET request `/getDiscussions` to retrieve
 * discussions filtered by a movie title and optionally sorted by date.
 * It handles loading and error states automatically.
 *
 * @function useDiscussions
 * @param {string} movieQuery - The title or identifier of the movie to fetch discussions for.
 * @param {boolean} sortByDate - Whether to sort the discussions by date (true = newest first).
 *
 * @returns {Object} An object containing:
 * - {Array} discussions - The array of discussion objects retrieved from the API.
 * - {boolean} loading - Indicates if the data is currently being fetched.
 * - {boolean} error - Indicates if an error occurred during the fetch process.
 *
 * @example
 * const { discussions, loading, error } = useDiscussions("Inception", true);
 *
 * @description
 * - Automatically triggers a new fetch every time `movieQuery` or `sortByDate` changes.
 * - Handles API call status using `loading` and `error` flags.
 */
export default function useDiscussions(movieQuery, sortByDate) {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        axios({
            method: "GET",
            url: `http://localhost:3000/getDiscussions`,
            params: {
                movieQuery,
                sortByDate
            }
        })
            .then((res) => {
                setDiscussions(res.data); // else  append new discussions
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [movieQuery, sortByDate]);

    return { discussions, loading, error };
}
