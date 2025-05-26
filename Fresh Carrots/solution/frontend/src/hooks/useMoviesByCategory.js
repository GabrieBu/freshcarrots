import { useEffect, useState} from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

/**
 * Custom hook to fetch categorized movie data.
 *
 * This hook retrieves several types of movie lists:
 * - Top-rated movies per genre (based on `hotGenres`)
 * - Movies recommended for adults (age ≥ 18)
 * - Popular worldwide movies
 * - Culturally relevant movies based on the user's language
 *
 * Each of these categories is fetched in parallel using `Promise.all`, and the data
 * is stored.
 *
 * @function useMoviesByCategory
 * @param {Array<Object>} hotGenres - Array of genre objects (e.g., `{ genre: "Action" }`) used to fetch top-rated movies by genre.
 * @param {string} userLanguage - The language code used to fetch culturally relevant movies (e.g., `"en"`, `"fr"`, `"it"`).
 *
 * @returns {Object} An object containing:
 * - {Object} moviesByCategory - A structured object with:
 *    - {Object} moviesByGenre - Key-value pairs where each key is a genre name and value is an array of movies.
 *    - {Array} moviesForAdult - Array of movies recommended for adults (18+).
 *    - {Array} worldwideMovies - Array of popular movies worldwide.
 *    - {Array} cultLanguageMovies - Array of movies in or related to the user's language/culture.
 * - {boolean} loading - Whether the data is currently being fetched.
 * - {boolean} error - Whether an error occurred during the fetch.
 *
 * @example
 * const { moviesByCategory, loading, error } = useMoviesByCategory(
 *   [{ genre: "Drama" }, { genre: "Action" }],
 *   "it"
 * );
 *
 * @description
 * - Fetches all required movie categories in parallel on initial mount.
 * - Consolidates all results into a single structured state object.
 * - Handles loading and error states.
 */
export default function useMoviesByCategory(hotGenres, userLanguage) {
    console.log("in hook: ", userLanguage)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [moviesByCategory, setMoviesByCategory] = useState({
        moviesByGenre: {},
        moviesForAdult: [],
        worldwideMovies: [],
        cultLanguageMovies: []
    });

    const fetchMovies = async (endpoint, params = {}) => {
        console.log("params: ", params);
        try {
            // query to main server
            // params depending on carousel type
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { params });
            return response.data; //returns 20 movies
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        }
    }

    useEffect(() => {
        const fetchAllMovies = async () => {
            setLoading(true);
            try {
                const [genreResults, adultMovies,worldwideMovies, cultMovies] = await Promise.all([ //wait for 4 both carousels, then display (promises)
                    Promise.all(hotGenres.map((item) => fetchMovies("topRated", { genre: item?.genre }))),
                    fetchMovies("ageMin", { age_min: "18" }),
                    fetchMovies("getWorldwideMovies"),
                    fetchMovies("getCultLanguage", {language: userLanguage}) //dynamic fetch movies depending on user's language
                ]);

                //create a complex object, dict of
                const moviesByGenre = hotGenres.reduce((acc, item, index) => {
                    acc[item.genre] = genreResults[index] || [];
                    return acc;
                }, {});

                //set complex object to the local state
                setMoviesByCategory({
                    moviesByGenre,
                    moviesForAdult: adultMovies,
                    worldwideMovies,
                    cultLanguageMovies: cultMovies
                });
                setError(false);
            } catch (error) {
                console.log("Error fetching moviesByCategory", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
    }, []); //deps empty = only on first mount

    return {
        moviesByCategory,
        loading,
        error
    };
}